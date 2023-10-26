const express = require ('express');
const router = express.Router();
const { authCustomer, addCustomer, getAllCustomers, searchCustomer, getCustomer, deleteCustomer, updateCustomer, validateCustomerEmail, getCustomerProfile} = require('../controllers/customerController');
const {authorization, checkAdminOrManager, checkAdmin} = require('../middleware/authMiddleware');

router.post('/customers/login', authCustomer);
router.post('/customers', addCustomer);

router.get('/customers',checkAdminOrManager, (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        return searchCustomer(req, res, next);  
    }
    getAllCustomers(req, res, next);  
});

router.get('/customers/:id',checkAdminOrManager, getCustomer);
router.delete('/customers/delete/:id', deleteCustomer);
router.put('/customers/:id', updateCustomer);
router.put('/customers/validate/:id', validateCustomerEmail);
//router.get('/customers/profile', getCustomerProfile);
//router.patch('/customers/profile/update', updateCustomerProfile);


module.exports = router;