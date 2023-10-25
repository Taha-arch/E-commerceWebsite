
const express = require('express');
const router = express.Router();
const {logUser, addUser, getUsers, getUser, searchUser, updateUser, deleteUser} = require('../controllers/userController.js');

router.post('/login', logUser);
router.post('/user', checkAdmin, addUser);

router.get('/users', checkAdminOrManager, (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        return searchUser(req, res, next); 
    }
    getUsers(req, res, next); 
});

router.get('/users/:id', checkAdminOrManager, getUser);
router.put('/users/:id', checkAdmin, updateUser);
router.delete('/users/:id', checkAdmin, deleteUser);

module.exports = router;