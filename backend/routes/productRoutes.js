const express = require('express');
const router = express.Router();
const {upload, uploadMultipleImages} = require('../middleware/upload');
const {addProduct, getAllProducts, searchProducts, getProduct, updateProduct, deleteProduct, getAllProductAscPrice} = require('../controllers/productController.js');
const {authorization, checkAdminOrManager, checkAdmin} = require('../middleware/authMiddleware');

//, checkAdminOrManager
router.post('/products', uploadMultipleImages, addProduct);
router.get('/products', (req, res, next) => {
    return (Object.keys(req.query).length > 0 ) ? (searchProducts(req, res, next)) : (getAllProducts(req, res, next));
});
// , checkAdminOrManager
router.get('/product', getAllProductAscPrice);
router.patch('/products/:id', updateProduct);
router.get('/products/:id', getProduct);
//, checkAdminOrManager
router.delete('/products/:id', deleteProduct);


module.exports = router;
