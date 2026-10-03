const express = require('express');
const router = express.Router();
const { scrapeProducts, processProducts, addScrapedProducts, getScrapingHistory } = require('../controllers/scraperController');
const { checkAdmin } = require('../middleware/authMiddleware');

// Scraper routes (admin only)
router.post('/scrape', scrapeProducts);
router.get('/process', processProducts);
router.post('/add-scraped', addScrapedProducts);
router.get('/scraping-history', getScrapingHistory);

module.exports = router;