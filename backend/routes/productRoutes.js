const express = require('express');
const router = express.Router();
const {addProduct, getAllProducts, searchProducts, getProduct, updateProduct, deleteProduct, upload} = require('../controllers/productController.js');

router.post('/products', addProduct);
router.get('/products', (req, res, next) => {
    return (Object.keys(req.query).length > 0 ) ? (searchProducts) : (getAllProducts);
});
router.get('/products/:id', upload.single, getProduct);
router.patch('/products/:id', updateProduct);
router.get('/products/:id', getProduct);
router.delete('/products/:id', deleteProduct);


module.exports = router;