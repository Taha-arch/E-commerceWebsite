const express = require('express');
const router = express.Router();
const {addSubcategory, getAllSubcategories, searchSubcategory, getSubcategory, updateSubcategory, deleteSubcategory} = require('../controllers/SubcategoryController');
const checkAdminOrManager = require('./api')

router.post('/', checkAdminOrManager, addSubcategory);
router.get('/', getAllSubcategories);
router.get('/search/', searchSubcategory);
router.get('/:id', getSubcategory);
router.put('/:id', checkAdminOrManager, updateSubcategory);
router.delete('/:id', checkAdminOrManager, deleteSubcategory);

module.exports = router;
