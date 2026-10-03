const Settings = require('../models/settingsModel');

const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne() || {
      modelName: 'product-ranking-v2',
      minConfidenceThreshold: 60,
      maxProductsToProcess: 50,
      preferredCategories: ['Jewelry'],
      rankingFactors: { price: 3, quality: 4, popularity: 5, reviews: 4, features: 3 },
      autoSelectRecommended: true,
      autoProcessImages: true,
    };
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const saveSettings = async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.status(200).json({ message: 'Settings saved successfully', settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSettings,
  saveSettings,
};