from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import shutil
from scraper import MejuriScraper
from model import process_products
import json
from fastapi.background import BackgroundTasks
import time
import requests
import logging

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Enable CORS to allow communication with both frontend and Express backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScrapeRequest(BaseModel):
    url: str
    max_pages: int = 3
    max_products: int = 10

# Shared state for progress tracking
progress = {"scrape": 0, "process": 0}
scraped_products = []
processed_products = []

def clear_data_folder():
    """Delete all files in the data folder to prevent duplicates."""
    data_folder = "data"
    if os.path.exists(data_folder):
        try:
            for filename in os.listdir(data_folder):
                file_path = os.path.join(data_folder, filename)
                if os.path.isfile(file_path):
                    os.remove(file_path)
                    logger.info(f"Deleted file: {file_path}")
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
                    logger.info(f"Deleted directory: {file_path}")
        except Exception as e:
            logger.error(f"Error clearing data folder: {str(e)}")
    else:
        os.makedirs(data_folder)
        logger.info(f"Created data folder: {data_folder}")

@app.post("/scrape")
async def scrape_products(request: ScrapeRequest, background_tasks: BackgroundTasks):
    try:
        clear_data_folder()
        scraper = MejuriScraper()
        progress["scrape"] = 0
        scraped_products.clear()
        background_tasks.add_task(simulate_scrape, scraper, request.url, request.max_pages, request.max_products)
        return {"message": "Scraping started", "progress_key": "scrape"}
    except Exception as e:
        logger.error(f"Scraping failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Scraping failed: {str(e)}")

def simulate_scrape(scraper, url, max_pages, max_products):
    start_time = time.time()
    try:
        def update_progress(value):
            progress["scrape"] = min(100, value)
            logger.info(f"Scrape progress: {progress['scrape']}%")

        scraper.scrape_collection(
            max_pages=max_pages,
            max_products=max_products,
            progress_callback=update_progress
        )
        scraped_products.extend(scraper.products)

        output_file = "data/mejuri_rings.json"
        os.makedirs("data", exist_ok=True)
        scraper.save_to_json(output_file)
        progress["scrape"] = 100

        # Log scraping history to Express backend with error handling
        try:
            response = requests.post('http://localhost:3001/api/scraper/log-scrape', json={  # Updated to port 3001
                "url": url,
                "date": time.strftime("%Y-%m-%d"),
                "time": time.strftime("%H:%M:%S"),
                "productsScraped": len(scraper.products),
                "productsAdded": 0,
                "status": "completed",
            }, timeout=5)
            response.raise_for_status()
            logger.info("Successfully logged scrape history to Express backend")
        except requests.RequestException as e:
            logger.warning(f"Failed to log scrape history to Express backend: {str(e)}")
            # Continue execution instead of raising the error

    except Exception as e:
        progress["scrape"] = -1
        logger.error(f"Scraping error: {str(e)}")
        raise e
    finally:
        scraper.__del__()
        duration = time.time() - start_time
        logger.info(f"Scraping completed in {duration:.2f} seconds")

@app.get("/scrape-progress")
async def scrape_progress():
    if progress["scrape"] == -1:
        raise HTTPException(status_code=500, detail="Scraping failed")
    return {"progress": progress["scrape"]}

@app.get("/scraped-products")
async def get_scraped_products():
    return {"products": scraped_products}

@app.get("/process")
async def process_scraped_products(background_tasks: BackgroundTasks):
    try:
        input_file = "data/mejuri_rings.json"
        if not os.path.exists(input_file):
            raise HTTPException(status_code=404, detail="No scraped data found")
        
        progress["process"] = 0
        processed_products.clear()
        background_tasks.add_task(simulate_process, input_file)
        return {"message": "Processing started", "progress_key": "process"}
    except Exception as e:
        logger.error(f"Processing failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

def simulate_process(input_file):
    start_time = time.time()
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        total_items = len(data)
        top_products = []
        for i, item in enumerate(data):
            processed_item = process_products(input_file)[i] if i < len(process_products(input_file)) else item
            top_products.append(processed_item)
            progress["process"] = min(100, ((i + 1) / total_items) * 100)
            processed_products.append(processed_item)

        output_file = "data/top_5_products.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(top_products, f, ensure_ascii=False, indent=2)
        progress["process"] = 100
    except Exception as e:
        progress["process"] = -1
        logger.error(f"Processing error: {str(e)}")
        raise e
    finally:
        duration = time.time() - start_time
        logger.info(f"Processing completed in {duration:.2f} seconds")

@app.get("/process-progress")
async def process_progress():
    if progress["process"] == -1:
        raise HTTPException(status_code=500, detail="Processing failed")
    return {"progress": progress["process"]}

@app.get("/processed-products")
async def get_processed_products():
    return {"products": processed_products}

if __name__ == "__main__":
    os.makedirs("data", exist_ok=True)
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)