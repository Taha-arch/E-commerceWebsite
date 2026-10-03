const axios = require('axios');
const ScrapingHistory = require('../models/scrapingHistoryModel');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';

const scrapeProducts = async (req, res) => {
  try {
    const { url, max_pages, max_products } = req.body;
    const response = await axios.post(`${FASTAPI_URL}/scrape`, {
      url,
      max_pages,
      max_products,
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.response?.data?.detail || error.message });
  }
};

const getScrapedProducts = async (req, res) => {
  try {
    const response = await axios.get(`${FASTAPI_URL}/scraped-products`);
    res.status(200).json({ products: response.data.products || [] });
  } catch (error) {
    res.status(500).json({ message: error.response?.data?.detail || error.message });
  }
};

const processProducts = async (req, res) => {
  try {
    const response = await axios.get(`${FASTAPI_URL}/process`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.response?.data?.detail || error.message });
  }
};

const getProcessedProducts = async (req, res) => {
  try {
    const response = await axios.get(`${FASTAPI_URL}/processed-products`);
    const history = await ScrapingHistory.findOne().sort({ _id: -1 });
    if (history && response.data.products?.length) {
      history.scoreRange = `${Math.min(...response.data.products.map(p => Math.round(p.bestseller_probability * 100)))}-${Math.max(...response.data.products.map(p => Math.round(p.bestseller_probability * 100)))}%`;
      await history.save();
    }
    res.status(200).json({ products: response.data.products || [] });
  } catch (error) {
    res.status(500).json({ message: error.response?.data?.detail || error.message });
  }
};

const addScrapedProducts = async (req, res) => {
    try {
      let products = req.body.products;
  
      // Ensure products is an array, even if only one product is sent
      if (!Array.isArray(products)) {
        products = [products];
      }
  
      // Fetch category and subcategory IDs
      const category = await Category.findOne({ category_name: 'Women' });
      const subcategory = await Subcategory.findOne({ subcategory_name: 'Ring' });
  
    
  
      const savedProducts = await Product.insertMany(products.map(p => ({
        product_name: p.product_name, // Match schema field
        price: p.price,
        short_description: p.short_description, // Match schema field
        long_description: p.long_description || 'This is a default long description to meet the minimum length requirement of 40 characters.', // Fallback
        product_image: p.product_image, 
        sku: p.sku,
        quantity: p.quantity,
        category_id: category._id,
        subcategory_id: subcategory._id,
        active: true, // Match schema field
      })), { ordered: false }); // Ignore duplicates
  
      const history = await ScrapingHistory.findOne().sort({ _id: -1 });
      if (history) {
        history.productsAdded = savedProducts.length;
        await history.save();
      }
      res.status(200).json({ message: `Successfully added ${savedProducts.length} products`, products: savedProducts });
    } catch (error) {
      console.error('Error adding products:', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: `Product validation failed: ${error.message}` });
      } else if (error.name === 'MongoServerError' && error.code === 11000) {
        return res.status(409).json({ message: 'Duplicate product detected, skipping duplicates' });
      }
      res.status(500).json({ message: error.message });
    }
  };

const getScrapingHistory = async (req, res) => {
  try {
    const history = await ScrapingHistory.find().sort({ _id: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getScrapeProgress = async (req, res) => {
  try {
    const response = await axios.get(`${FASTAPI_URL}/scrape-progress`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.response?.data?.detail || error.message });
  }
};

const getProcessProgress = async (req, res) => {
  try {
    const response = await axios.get(`${FASTAPI_URL}/process-progress`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.response?.data?.detail || error.message });
  }
};

const logScrape = async (req, res) => {
  try {
    const { url, date, time, productsScraped, productsAdded, status } = req.body;
    await ScrapingHistory.create({
      url,
      date,
      time,
      productsScraped,
      productsAdded,
      status,
    });
    res.status(200).json({ message: 'Scraping history logged' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  scrapeProducts,
  getScrapedProducts,
  processProducts,
  getProcessedProducts,
  addScrapedProducts,
  getScrapingHistory,
  getScrapeProgress,
  getProcessProgress,
  logScrape,
};