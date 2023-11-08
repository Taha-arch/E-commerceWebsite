const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {addProduct, getAllProducts, searchProducts, getProduct, updateProduct, deleteProduct} = require('../controllers/productController.js');
const {authorization, checkAdminOrManager, checkAdmin} = require('../middleware/authMiddleware');

//, checkAdminOrManager
router.post('/products', upload.single('product_image'), addProduct);
router.get('/products', (req, res, next) => {
    return (Object.keys(req.query).length > 0 ) ? (searchProducts(req, res, next)) : (getAllProducts(req, res, next));
});


router.patch('/products/:id', checkAdminOrManager, updateProduct);
router.get('/products/:id', getProduct);
//, checkAdminOrManager
router.delete('/products/:id', deleteProduct);


module.exports = router;
