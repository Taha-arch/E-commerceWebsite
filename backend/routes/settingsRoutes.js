const express = require('express');
const router = express.Router();
const { getSettings, saveSettings } = require('../controllers/settingsController');
const { checkAdmin } = require('../middleware/authMiddleware');

// Settings routes (admin only)
router.get('/', getSettings);
router.post('/', saveSettings);

module.exports = router;