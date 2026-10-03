import requests
from bs4 import BeautifulSoup
import json
import time
import re
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager # Ensure this is installed: pip install webdriver-manager
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import TimeoutException, WebDriverException, NoSuchElementException
from concurrent.futures import ThreadPoolExecutor, as_completed
import os

class MejuriScraper:
    """
    A web scraper for Mejuri product data.
    It first collects product URLs from collection pages and then scrapes detailed information for each product.
    """
    def __init__(self):
        """
        Initializes the scraper, sets up the Selenium WebDriver, and defines base URLs and data structures.
        """
        self.base_url = "https://mejuri.com/world/en/collections/rings" # Base URL for the rings collection
        self.products = []  # List to store scraped product data
        self.seen_skus = set()  # Set to track SKUs to avoid duplicate products

        # Configure Chrome options for headless browsing and performance
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Run Chrome in headless mode (no GUI)
        chrome_options.add_argument("--no-sandbox")  # Bypass OS security model, required in some environments
        chrome_options.add_argument("--disable-dev-shm-usage")  # Overcome limited resource problems
        chrome_options.add_argument("--disable-gpu")  # Disable GPU hardware acceleration
        chrome_options.add_argument("--disable-webgl") # Disable WebGL
        # chrome_options.add_argument("--enable-unsafe-swiftshader") # Software rendering, fallback if GPU issues
        # chrome_options.add_argument("--disable-features=VizDisplayCompositor") # May help in some headless environments

        # Optional: Disable images to potentially speed up page loads if images are not critical for initial HTML structure
        # However, this will break image URL extraction if they are loaded via <img> src attributes directly.
        # prefs = {"profile.managed_default_content_settings.images": 2}  # 1:Allow, 2:Block
        # chrome_options.add_experimental_option("prefs", prefs)

        # Set a common user agent to mimic a real browser
        user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
        chrome_options.add_argument(f"user-agent={user_agent}")

        # Initialize the Chrome WebDriver using WebDriverManager to automatically handle driver downloads
        try:
            self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
        except ValueError as ve:
            print(f"WebDriverManager error: {ve}. This might be due to network issues or an inability to download/find ChromeDriver.")
            print("Ensure you have a stable internet connection. If issues persist, try installing ChromeDriver manually and providing its path.")
            raise
        
        self.driver.set_page_load_timeout(60)  # Set a timeout for page loads (in seconds)

    def __del__(self):
        """
        Ensures the WebDriver is closed when the scraper object is deleted.
        """
        if hasattr(self, 'driver') and self.driver:
            self.driver.quit()

    def scrape_collection(self, max_pages=3, max_products=10, progress_callback=None):
        """
        Manages the overall scraping process for a collection.
        
        Args:
            max_pages (int): Maximum number of collection pages to scrape for product URLs.
            max_products (int): Maximum number of products to scrape details for. If 0, scrapes all found.
            progress_callback (function, optional): A callback function to report progress.
                                                    It receives a float (0-100) representing the percentage.
        Returns:
            list: A list of dictionaries, where each dictionary contains data for a scraped product.
        """
        print(f"Starting scrape: max_pages={max_pages}, max_products={max_products if max_products > 0 else 'all'}")
        
        # --- Phase 1: Collect all product URLs ---
        print("\n--- Phase 1: Collecting product URLs ---")
        all_product_urls_to_scrape = []
        current_page = 1
        while current_page <= max_pages:
            print(f"Attempting to get URLs from collection page: {current_page}")
            product_urls_on_page = self.get_product_urls_from_page(current_page)
            if not product_urls_on_page:
                print(f"No more products found on page {current_page} or page limit ({max_pages}) reached.")
                break
            print(f"Found {len(product_urls_on_page)} product URLs on page {current_page}.")
            all_product_urls_to_scrape.extend(product_urls_on_page)
            current_page += 1
            # Optional: Stop early if max_products limit is already met by URL count
            if max_products > 0 and len(all_product_urls_to_scrape) >= max_products:
                print(f"Collected enough URLs ({len(all_product_urls_to_scrape)}) to meet max_products ({max_products}).")
                break
        
        # Deduplicate URLs collected across pages
        unique_product_urls = []
        seen_urls_for_session = set()
        for url in all_product_urls_to_scrape:
            if url not in seen_urls_for_session:
                unique_product_urls.append(url)
                seen_urls_for_session.add(url)
        
        print(f"Collected {len(unique_product_urls)} unique product URLs in total.")

        # Cap at max_products if specified
        if max_products > 0:
            urls_to_process = unique_product_urls[:max_products]
        else:
            urls_to_process = unique_product_urls
        
        total_urls_to_process = len(urls_to_process)
        if total_urls_to_process == 0:
            print("No product URLs to process. Exiting.")
            return self.products

        # --- Phase 2: Scrape details for each product URL ---
        print(f"\n--- Phase 2: Scraping details for {total_urls_to_process} products ---")
        product_count = 0

        # Sequential processing (safer with single Selenium driver instance)
        for i, url in enumerate(urls_to_process):
            product_data = self.get_product_details(url)
            if product_data:
                # Deduplicate by SKU (primary key)
                if product_data['sku'] not in self.seen_skus:
                    self.seen_skus.add(product_data['sku'])
                    self.products.append(product_data)
                    product_count += 1
                    print(f"Scraped product {product_count}/{total_urls_to_process}: {product_data['product_name']} (SKU: {product_data['sku']})")
                    if progress_callback:
                        progress = (product_count / total_urls_to_process) * 100
                        progress_callback(progress)
                else:
                    print(f"Skipping duplicate SKU: {product_data['sku']} from URL: {url}")
            else:
                print(f"Failed to get details or skipped URL: {url}")
            
            # Small delay to be polite to the server
            # time.sleep(0.5) # Adjust as needed, or remove if waits within functions are sufficient

        print(f"\nCompleted scraping. Total products collected: {len(self.products)}")
        return self.products

    def get_product_urls_from_page(self, page_num):
        """
        Fetches all unique product URLs from a given collection page number.

        Args:
            page_num (int): The page number of the collection to scrape.

        Returns:
            list: A list of unique product URLs found on the page, or an empty list on failure.
        """
        # Construct page URL. Mejuri uses ?page= for pagination.
        url = f"{self.base_url}?page={page_num}" if page_num > 1 else self.base_url
        print(f"Fetching collection page {page_num}: {url}")
        
        attempts = 3  # Number of retry attempts for fetching the page
        for attempt in range(attempts):
            try:
                self.driver.get(url)
                # Wait for product links to be present on the page.
                # Adjust selector if needed, e.g., a specific grid container for products.
                WebDriverWait(self.driver, 20).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, 'a[href*="/products/"]'))
                )

                # Scroll to ensure all lazy-loaded products are triggered
                # This can be site-specific; adjust scrolling strategy if needed.
                print("Scrolling page to load all products...")
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight*0.3);")
                time.sleep(0.7) # Give time for content to load
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight*0.6);")
                time.sleep(0.7)
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(1.5) # Longer pause for final loads
                self.driver.execute_script("window.scrollTo(0, 0);") # Scroll back to top (optional)

                # Parse page content with BeautifulSoup
                soup = BeautifulSoup(self.driver.page_source, 'html.parser')
                
                product_links_on_page = []
                # Select <a> tags whose href contains "/products/"
                # This is a common pattern but might need refinement if it picks up non-product links.
                all_link_elements = soup.select('a[href*="/products/"]')
                
                seen_page_urls = set() # To deduplicate URLs found on this specific page
                for link_element in all_link_elements:
                    if 'href' in link_element.attrs:
                        product_url_path = link_element['href']
                        
                        # Construct absolute URL if it's relative
                        if not product_url_path.startswith('http'):
                            base_mejuri_url = "https://mejuri.com" # Ensure this is the correct base
                            product_url = f"{base_mejuri_url}{product_url_path}" if product_url_path.startswith('/') else f"{base_mejuri_url}/{product_url_path}"
                        else:
                            product_url = product_url_path

                        # Basic filtering:
                        # - Ensure it's a product detail page (often no /collections/ in product URLs themselves)
                        # - Avoid anchors or JavaScript links
                        if "/collections/" in product_url or "#" in product_url or "javascript:void" in product_url.lower():
                            continue
                        
                        # Further check: product URLs usually end with the product slug
                        if not re.search(r'/products/[a-zA-Z0-9-]+/?$', product_url.split('?')[0]):
                            continue


                        if product_url not in seen_page_urls:
                            product_links_on_page.append(product_url)
                            seen_page_urls.add(product_url)
                
                if not product_links_on_page:
                    print(f"No product links found on page {page_num} with current selectors.")
                return product_links_on_page

            except TimeoutException:
                print(f"Attempt {attempt + 1}/{attempts} for page {page_num}: Timeout waiting for page elements.")
                if attempt == attempts - 1:
                    print(f"All attempts failed for page {page_num}. Skipping.")
                    return []
                time.sleep(3 ** attempt)  # Exponential backoff
            except WebDriverException as e:
                print(f"Attempt {attempt + 1}/{attempts} for page {page_num}: WebDriver error: {str(e)}")
                if "net::ERR" in str(e) or "ERR_NAME_NOT_RESOLVED" in str(e): # Common network errors
                    if attempt == attempts - 1:
                        print(f"Could not reach host at {url} after {attempts} attempts. Skipping.")
                        return []
                else: # Other WebDriver errors
                    if attempt == attempts - 1:
                        print(f"WebDriver failed for page {url} after {attempts} attempts. Skipping.")
                        return []
                time.sleep(3 ** attempt) # Exponential backoff
            except Exception as e: # Catch any other unexpected errors during page processing
                print(f"Attempt {attempt + 1}/{attempts} for page {page_num} failed with unexpected error: {str(e)}")
                if attempt == attempts - 1:
                    print(f"All attempts failed for page {page_num} due to unexpected error. Skipping.")
                    return []
                time.sleep(3 ** attempt)
        return [] # Should only be reached if all attempts fail

    def get_product_details(self, url):
        """
        Fetches detailed information for a single product from its URL.

        Args:
            url (str): The URL of the product detail page.

        Returns:
            dict: A dictionary containing product details, or None on failure.
        """
        attempts = 3
        for attempt in range(attempts):
            try:
                print(f"Fetching product details: {url} (Attempt {attempt+1})")
                self.driver.get(url)
                # Wait for a key element that indicates product page has loaded, e.g., product title.
                # Use a more specific selector if available.
                WebDriverWait(self.driver, 20).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "h1, [class*='product-title'], [data-product-title]"))
                )

                # Optional: Scroll if details (like long description or reviews) are lazy-loaded.
                # self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight*0.4);")
                # time.sleep(0.5)
                # self.driver.execute_script("window.scrollTo(0, 0);")

                soup = BeautifulSoup(self.driver.page_source, 'html.parser')

                # --- Extract Product Information ---
                # Product Name
                product_name_elem = soup.select_one('h1, [class*="product-title" i], [data-product-title]')
                product_name = product_name_elem.text.strip() if product_name_elem else f"Unnamed Product - {url.split('/')[-1].split('?')[0]}"

                # Images
                images = self.extract_product_images(soup, max_images=5) # Get up to 5 images

                # Short Description
                short_desc_elem = soup.select_one('[class*="subtitle" i], [class*="summary" i], [class*="product__description--short" i], [data-product-short-description]')
                short_description = short_desc_elem.text.strip() if short_desc_elem else "No short description available."

                # Long Description
                # Look for a more detailed description section.
                long_desc_candidates = soup.select('[class*="details" i], [class*="product__description--full" i], [data-product-description], section[id*="description" i]')
                long_description = ""
                for elem in long_desc_candidates:
                    text = elem.get_text(separator="\n", strip=True)
                    if len(text) > len(long_description) and len(text) > len(short_description): # Prefer longer, more distinct text
                        long_description = text
                if not long_description:
                    long_description = short_description # Fallback to short if no distinct long description found

                # Prices
                prices_found_text = []
                # Common price selectors. Adjust if Mejuri uses specific classes/data attributes.
                price_elems = soup.select('[class*="price" i], [data-product-price], span[class*="money" i], div[class*="product-price" i]')
                for elem in price_elems:
                    price_text = elem.text.strip()
                    # Ensure it looks like a price (contains digits and currency symbol)
                    if re.search(r'[\$€£]\s*\d', price_text) or re.search(r'\d+\s*[\$€£]', price_text):
                         prices_found_text.append(price_text)
                
                cleaned_prices = sorted(list(set(p for p in [self.clean_price(pt) for pt in prices_found_text] if p is not None and p > 0)))
                
                price = cleaned_prices[-1] if cleaned_prices else 0.0 # Highest price as main price
                discount_price = cleaned_prices[0] if len(cleaned_prices) > 1 and cleaned_prices[0] < price else None

                # Rating and Review Count
                rating = None
                review_count = None
                
                # Try to find rating from aria-label or specific elements
                rating_elem = soup.select_one('[aria-label*="Rating" i], [aria-label*="stars" i], [class*="rating-summary" i], [class*="bv-rating-stars" i]')
                if rating_elem:
                    if 'aria-label' in rating_elem.attrs:
                        rating_match = re.search(r'(\d+\.?\d*)\s*out\s*of\s*(\d+)', rating_elem['aria-label'], re.IGNORECASE)
                        if rating_match:
                            val, out_of = float(rating_match.group(1)), float(rating_match.group(2))
                            if out_of > 0: rating = round((val / out_of) * 5, 1) # Normalize to 5-star scale

                    # Try to find rating text within the element too if aria-label failed
                    if not rating and rating_elem.text:
                         rating_text_match = re.search(r'(\d+\.?\d*)\s*(?:stars|out of)', rating_elem.text, re.IGNORECASE)
                         if rating_text_match:
                             rating_val = float(rating_text_match.group(1))
                             # Assume it's out of 5 if not specified, or adjust if site uses different scale
                             rating = round(min(rating_val, 5.0),1) 


                # Review count can often be near rating or in a separate element with text like "(123 reviews)"
                # Search broadly first, then try specific selectors
                page_text_for_reviews = soup.get_text(separator=' ', strip=True)
                # Regex for (123), 123 Reviews, 123 Ratings etc.
                count_match = re.search(r'\(?(\d{1,5})\)?\s*(?:reviews|ratings|avis|bewertungen)', page_text_for_reviews, re.IGNORECASE)
                if count_match:
                    review_count = int(count_match.group(1))
                else: # Try more specific selectors for review count
                    review_count_elem = soup.select_one('[class*="review-count" i], [href*="#reviews" i], [class*="bv-action-bar-button-read-reviews" i] span')
                    if review_count_elem and review_count_elem.text:
                        count_match_specific = re.search(r'\(?(\d+)\)?', review_count_elem.text.strip()) # Get digits from text like "Read (25) Reviews"
                        if count_match_specific: review_count = int(count_match_specific.group(1))
                
                # SKU
                # Try to find SKU on page, fallback to URL-derived SKU
                sku_on_page_elem = soup.select_one('[data-product-sku], [class*="sku" i], [class*="product-id" i]')
                sku = sku_on_page_elem.text.strip() if sku_on_page_elem and sku_on_page_elem.text.strip() else url.split('?')[0].split('/')[-1]
                sku = re.sub(r'[^\w-]', '', sku) # Clean SKU

                # Product Options (e.g., size, color) - Placeholder for more complex logic
                options = [] # This would require identifying option selectors and their values

                product_data = {
                    'sku': sku,
                    'product_url': url, # Adding the product URL itself
                    'product_image': images if images else ["https://via.placeholder.com/300x300.png?text=No+Image+Found"],
                    'product_name': product_name,
                    'short_description': short_description,
                    'long_description': long_description,
                    'price': price,
                    'discount_price': discount_price,
                    'currency': '$', # Assuming USD, extract if possible
                    'quantity': 50,  # Default quantity, actual stock level is hard to scrape reliably
                    'options': options,
                    'active': True, # Assuming product is active if scrapeable
                    'rating': rating,
                    'review_count': review_count,
                    'scraped_date': datetime.now().isoformat(),
                    'category_id': 'rings_general', # Example, make dynamic if scraping multiple categories
                    'subcategory_id': None # Example
                }
                return product_data

            except TimeoutException:
                print(f"Attempt {attempt + 1}/{attempts} for product {url}: Timeout.")
                if attempt == attempts - 1:
                    print(f"All attempts failed for {url}. Skipping product.")
                    return None
                time.sleep(3 ** attempt)
            except WebDriverException as e:
                print(f"Attempt {attempt + 1}/{attempts} for product {url}: WebDriver error: {str(e)}")
                if "net::ERR" in str(e) or "ERR_NAME_NOT_RESOLVED" in str(e):
                    if attempt == attempts - 1:
                        print(f"Could not reach host at {url} after {attempts} attempts. Skipping.")
                        return None
                else:
                    if attempt == attempts - 1:
                        print(f"WebDriver failed for product page {url} after {attempts} attempts. Skipping.")
                        return None
                time.sleep(3 ** attempt)
            except Exception as e:
                print(f"Attempt {attempt + 1}/{attempts} for product {url} failed with unexpected error: {type(e).__name__} - {str(e)}")
                if attempt == attempts - 1:
                    print(f"All attempts failed for product {url} due to unexpected error. Skipping.")
                    return None
                time.sleep(3 ** attempt)
        return None # Should only be reached if all attempts fail

    def extract_product_images(self, soup, max_images=3):
        """
        Extracts product image URLs from the page soup.
        Prioritizes JSON-LD, then specific CDN patterns, then generic image tags.

        Args:
            soup (BeautifulSoup): The BeautifulSoup object of the product page.
            max_images (int): Maximum number of image URLs to return.

        Returns:
            list: A list of unique, cleaned image URLs.
        """
        all_image_urls = []

        # 1. Try JSON-LD first (often contains high-quality image URLs)
        json_ld_scripts = soup.find_all('script', type='application/ld+json')
        for script_tag in json_ld_scripts:
            if script_tag.string:
                try:
                    data = json.loads(script_tag.string)
                    items_to_check = []
                    if isinstance(data, list): # Some sites have a list of JSON-LD objects
                        items_to_check.extend(data)
                    elif isinstance(data, dict):
                        items_to_check.append(data)
                    
                    for item in items_to_check:
                        if item.get('@type') == 'Product' or "Product" in str(item.get('@type')): # Check for 'Product' or 'SingleProduct' etc.
                            self._extract_images_from_json_ld_product(item, all_image_urls)
                except json.JSONDecodeError:
                    continue # Ignore malformed JSON

        # 2. Shopify CDN images (common for many e-commerce sites)
        # Look for img tags and source tags with Shopify CDN URLs.
        # More specific parent containers can make this more reliable.
        shopify_selectors = [
            'img[src*="cdn.shopify.com/s/files/"]', 
            'source[srcset*="cdn.shopify.com/s/files/"]',
            'img[data-src*="cdn.shopify.com/s/files/"]', # For lazy-loaded images
            'img[data-srcset*="cdn.shopify.com/s/files/"]'
        ]
        for selector in shopify_selectors:
            elements = soup.select(selector)
            for img_element in elements:
                src_candidates = []
                if img_element.has_attr('srcset'): src_candidates.extend(img_element['srcset'].split(','))
                if img_element.has_attr('data-srcset'): src_candidates.extend(img_element['data-srcset'].split(','))
                if img_element.has_attr('src'): src_candidates.append(img_element['src'])
                if img_element.has_attr('data-src'): src_candidates.append(img_element['data-src'])

                for src_item in src_candidates:
                    url_match = re.search(r'(https?://[^\s,]+)', src_item.strip()) # Extract URL part
                    if url_match:
                        img_url = url_match.group(1)
                        if 'cdn.shopify.com/s/files/' in img_url and not any(skip in img_url for skip in ['_thumb.', '_small.', 'loader.gif', '.svg', '_icon.']):
                            all_image_urls.append(img_url)
        
        # 3. Sanity CDN images (another common CDN)
        if not all_image_urls or len(all_image_urls) < max_images : # Only if Shopify images weren't enough
            sanity_images = soup.select('img[src*="cdn.sanity.io/images/"]')
            for img in sanity_images:
                if img.has_attr('src') and not any(skip in img['src'] for skip in ['loader.gif','.svg']):
                    all_image_urls.append(img['src'])
        
        # 4. Generic image tags if still not enough images (less reliable, might pick up logos etc.)
        if not all_image_urls or len(all_image_urls) < max_images:
            # Try to find images within a main product image container if possible
            main_image_container = soup.select_one('[class*="product--image" i], [class*="product-gallery" i], div[role="img"]')
            search_area = main_image_container if main_image_container else soup
            
            generic_imgs = search_area.select('img[src]')
            for img in generic_imgs:
                src = img['src']
                if src.startswith('http') and re.search(r'\.(?:jpg|jpeg|png|webp)', src, re.IGNORECASE) \
                   and not any(skip in src for skip in ['loader.gif', '.svg', 'icon', 'logo', 'banner', 'placeholder']):
                    all_image_urls.append(src)


        # Deduplicate, clean, and limit images
        unique_images_processed = []
        seen_image_filenames = set() # Use filename or a significant part of URL for uniqueness
        for url in all_image_urls:
            if not url or not url.startswith('http'):
                continue

            # Clean URL: remove query parameters like version, width/height if aiming for original
            # This is highly dependent on CDN structure. For Shopify, sometimes removing params gives original.
            # Example for Shopify: remove _WIDTHx, _Quality, ?v=TIMESTAMP
            cleaned_url = re.sub(r'_\d+x\d*([qr]\d+)?\.', '.', url) # e.g., _300x300.jpg -> .jpg or _300x.jpg -> .jpg
            cleaned_url = re.sub(r'\?v=.*', '', cleaned_url)      # Remove ?v=12345
            cleaned_url = re.sub(r'&width=\d+.*', '', cleaned_url) # Remove &width=... and subsequent params

            # Create a key for uniqueness check (e.g., filename)
            try:
                filename_part = os.path.basename(cleaned_url.split('?')[0])
            except:
                filename_part = cleaned_url # Fallback if os.path.basename fails

            if filename_part and filename_part not in seen_image_filenames:
                seen_image_filenames.add(filename_part)
                unique_images_processed.append(cleaned_url)
        
        return unique_images_processed[:max_images]

    def _extract_images_from_json_ld_product(self, product_data, images_list):
        """Helper to extract images from a Product JSON-LD object."""
        if not product_data or not isinstance(product_data, dict):
            return

        image_sources = product_data.get('image')
        if not image_sources: return

        if isinstance(image_sources, list):
            for img_obj in image_sources:
                if isinstance(img_obj, str) and img_obj.startswith('http'):
                    images_list.append(img_obj)
                elif isinstance(img_obj, dict) and isinstance(img_obj.get('url'), str) and img_obj['url'].startswith('http'):
                    images_list.append(img_obj['url'])
                elif isinstance(img_obj, dict) and isinstance(img_obj.get('contentUrl'), str) and img_obj['contentUrl'].startswith('http'): # Another common key
                    images_list.append(img_obj['contentUrl'])
        elif isinstance(image_sources, str) and image_sources.startswith('http'):
            images_list.append(image_sources)
        elif isinstance(image_sources, dict) and isinstance(image_sources.get('url'), str) and image_sources['url'].startswith('http'):
             images_list.append(image_sources['url'])
        elif isinstance(image_sources, dict) and isinstance(image_sources.get('contentUrl'), str) and image_sources['contentUrl'].startswith('http'):
             images_list.append(image_sources['contentUrl'])


    def clean_price(self, price_text):
        """
        Cleans a price string and converts it to a float.
        Handles common currency symbols and thousand/decimal separators.

        Args:
            price_text (str): The raw price string (e.g., "$1,234.56", "€1.234,56").

        Returns:
            float: The cleaned price as a float, or None if cleaning fails.
        """
        if not price_text or not isinstance(price_text, str):
            return None
        
        # Remove currency symbols and any non-digit, non-comma, non-dot characters
        # (except for keeping comma and dot for now)
        cleaned_text = re.sub(r'[^\d,.]', '', price_text)
        
        if not cleaned_text:
            return None

        # Determine if comma or dot is the decimal separator based on the last occurrence
        last_dot = cleaned_text.rfind('.')
        last_comma = cleaned_text.rfind(',')

        if last_dot > last_comma: # Dot is likely decimal (e.g., 1,234.56 or 1234.56)
            cleaned_text = cleaned_text.replace(',', '') # Remove thousand separators
        elif last_comma > last_dot: # Comma is likely decimal (e.g., 1.234,56 or 1234,56)
            cleaned_text = cleaned_text.replace('.', '') # Remove thousand separators
            cleaned_text = cleaned_text.replace(',', '.') # Convert decimal comma to dot
        else: # No clear decimal, or only one type of separator, or neither
            cleaned_text = cleaned_text.replace(',', '') # Assume comma was thousands if dot not present or before

        try:
            return float(cleaned_text)
        except ValueError:
            # print(f"Could not convert price string to float: '{price_text}' -> '{cleaned_text}'")
            return None

    def save_to_json(self, filename='data/mejuri_products.json'):
        """
        Saves the scraped product data to a JSON file.

        Args:
            filename (str): The name of the file to save the data to.
        """
        # Ensure the directory exists
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.products, f, ensure_ascii=False, indent=4) # Indent for readability
        print(f"Saved {len(self.products)} products to {filename}")

# --- Example Usage ---
if __name__ == '__main__':
    start_time = time.time()
    
    # --- Configuration for the scrape ---
    MAX_COLLECTION_PAGES = 1  # Number of collection pages to scan for product URLs
    MAX_PRODUCTS_TO_SCRAPE = 5 # Max number of products to fetch details for (0 for all found on scanned pages)
    OUTPUT_FILENAME = "data/mejuri_rings_data.json"

    scraper = None # Initialize scraper to None for finally block
    try:
        scraper = MejuriScraper()

        # Define a simple progress callback function
        def my_progress_callback(current_progress):
            print(f"Scraping details progress: {current_progress:.2f}%")

        print(f"Initializing Mejuri Scraper for 'rings' collection.")
        print(f"Will scan up to {MAX_COLLECTION_PAGES} collection pages.")
        print(f"Will attempt to scrape details for up to {MAX_PRODUCTS_TO_SCRAPE if MAX_PRODUCTS_TO_SCRAPE > 0 else 'all found'} products.")
        
        scraped_data = scraper.scrape_collection(
            max_pages=MAX_COLLECTION_PAGES, 
            max_products=MAX_PRODUCTS_TO_SCRAPE,
            progress_callback=my_progress_callback
        )
        
        if scraped_data:
            print(f"\nSuccessfully scraped {len(scraped_data)} products.")
            scraper.save_to_json(OUTPUT_FILENAME)
        else:
            print("\nNo data was scraped or an error occurred before data collection.")

    except Exception as e:
        print(f"An critical error occurred during the scraping process: {type(e).__name__} - {e}")
        import traceback
        traceback.print_exc()
    finally:
        if scraper and hasattr(scraper, 'driver') and scraper.driver:
            print("Closing WebDriver...")
            scraper.driver.quit() # Ensure driver is quit even if __del__ is not called immediately
    
    end_time = time.time()
    print(f"Total scraping time: {end_time - start_time:.2f} seconds.")

