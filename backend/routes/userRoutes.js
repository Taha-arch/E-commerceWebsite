
const express = require('express');
const router = express.Router();
const uploadUserImage = require('../middleware/upload');
const {logUser, addUser, getUsers, getUser, searchUser, updateUser, deleteUser} = require('../controllers/userController.js');
const { authorization, checkAdminOrManager, checkAdmin } = require('../middleware/authMiddleware.js')

router.post('/login' , logUser);
router.post('/user', uploadUserImage.single('user_image'), addUser);

router.get('/users',authorization , (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        return getUsers(req, res, next);  
    }else{
        searchUser(req, res, next);
    }
    
});

router.get('/users/:id',authorization , getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;