const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  modelName: { type: String, default: 'product-ranking-v2' },
  minConfidenceThreshold: { type: Number, default: 60 },
  maxProductsToProcess: { type: Number, default: 50 },
  preferredCategories: { type: [String], default: ['Jewelry'] },
  rankingFactors: {
    price: { type: Number, default: 3 },
    quality: { type: Number, default: 4 },
    popularity: { type: Number, default: 5 },
    reviews: { type: Number, default: 4 },
    features: { type: Number, default: 3 },
  },
  autoSelectRecommended: { type: Boolean, default: true },
  autoProcessImages: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);