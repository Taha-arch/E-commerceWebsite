const express = require('express');
const router = express.Router();

const {setPayment} = require('../controllers/stripeController');

router.post('/create-checkout-session', setPayment);

module.exports = router;
