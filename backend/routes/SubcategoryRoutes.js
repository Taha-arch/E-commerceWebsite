const express = require('express');
const router = express.Router();
const {addSubcategory, getAllSubcategories, searchSubcategory, getSubcategory, updateSubcategory, deleteSubcategory} = require('../controllers/SubcategoryController');
const checkAdminOrManager = require('./api')

router.post('/', checkAdminOrManager, addSubcategory);
router.get('/', getAllSubcategories);
router.get('/search/', searchSubcategory);
// router.get('/', (req, res, next) => {
//     if (Object.keys(req.query).length > 0) {
//         return searchSubcategory(req, res, next);
//     }
//     getAllSubcategories(req, res, next);
// });
router.get('/:id', getSubcategory);
router.put('/:id', checkAdminOrManager, updateSubcategory);
router.delete('/:id', checkAdminOrManager, deleteSubcategory);

module.exports = router;
