
const express = require('express');
const router = express.Router();
const {logUser, addUser, getUsers, getUser, searchUser, updateUser, deleteUser} = require('../controllers/userController.js');
 
router.post('/login', logUser);
router.post('/user', addUser);

router.get('/users', (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        return searchUser(req, res, next); 
    }
    getUsers(req, res, next); 
});

router.get('/users/:id', getUser);

router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;