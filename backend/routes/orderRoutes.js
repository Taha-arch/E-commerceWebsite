const express = require ('express');
const router = express.Router();
const {addOrder, getAllOrders, getOrder, UpdateOrder} = require('../controllers/orderController');
const {authorization, checkAdminOrManager, checkAdmin} = require('../middleware/authMiddleware');


router.post('/orders', addOrder);
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrder);
router.put('/orders/:id', UpdateOrder);

module.exports = router;