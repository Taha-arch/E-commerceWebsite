const mongoose = require('mongoose');

const scrapingHistorySchema = new mongoose.Schema({
  url: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  productsScraped: { type: Number, required: true },
  productsAdded: { type: Number, default: 0 },
  status: { type: String, enum: ['completed', 'failed'], required: true },
  scoreRange: { type: String, default: 'N/A' },
}, { timestamps: true });

module.exports = mongoose.model('ScrapingHistory', scrapingHistorySchema);