const express = require('express');
const router = express.Router();

const multer = require('multer');
const {addProduct, getAllProducts, searchProducts, getProduct, updateProduct, deleteProduct} = require('../controllers/productController.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post('/products', upload.single('image'), addProduct);
router.get('/products', (req, res, next) => {
    return (Object.keys(req.query).length > 0 ) ? (searchProducts(req, res, next)) : (getAllProducts(req, res, next));
});

router.get('/products/:id', getProduct);
router.patch('/products/:id', updateProduct);
router.get('/products/:id', getProduct);
router.delete('/products/:id', deleteProduct);


module.exports = router;
