const express = require ('express');
const router = express.Router();
const {uploadCustomerImage} = require('../middleware/upload')
const { authCustomer, addCustomer, getAllCustomers, searchCustomer, getCustomer, deleteCustomer, updateCustomer, validateCustomerEmail, getCustomerProfile} = require('../controllers/customerController');
const {authorization, checkAdminOrManager, checkAdmin} = require('../middleware/authMiddleware');

router.post('/customers/login', authCustomer);
router.post('/customers', addCustomer);
router.get('/customers/search',checkAdminOrManager, searchCustomer)
router.get('/customers',checkAdminOrManager, getAllCustomers);

router.get('/customers/:id',checkAdminOrManager, getCustomer);
router.delete('/customers/delete/:id', deleteCustomer);
router.put('/customers/validate',authorization, validateCustomerEmail);
router.put('/customers/:id', uploadCustomerImage ,checkAdminOrManager, updateCustomer);

//router.get('/customers/profile', getCustomerProfile);
//router.patch('/customers/profile/update', updateCustomerProfile);


module.exports = router;