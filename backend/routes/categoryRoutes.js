const express = require('express');
const router = express.Router();
const {addCategory, getAllCategories, searchCategory, getCategory, updateCategory, deleteCategory} = require('../controllers/categoryController');
const checkAdminOrManager = require('./api')

router.post('/',checkAdminOrManager ,addCategory);

router.get('/', (req, res, next) => {
     if (Object.keys(req.query).length > 0) {
        searchCategory(req, res, next);
     }else{
        getAllCategories(req, res, next);
     }
});
router.get('/:id', getCategory);
router.put('/:id', checkAdminOrManager, updateCategory);
router.delete('/:id', checkAdminOrManager, deleteCategory);

module.exports = router;