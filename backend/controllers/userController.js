const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

const logUser = async (req, res) =>{
    const {user_name, password, rememberMe } = req.body;
    const userFound = await User.findOne({user_name});

    if(userFound && (await bcrypt.compareSync(password, userFound.password))){
        let token = generateJwt(userFound._id, userFound.role, rememberMe);
        console.log(token);

        res.status(200).json({ message: "Logged in successfully" });
    }else {
        res.status(401).json('Invalid email or username');
    }
}

const generateJwt = ((id, role, rememberMe) => {
    return jwt.sign({id, role}, SECRET_KEY, {expiresIn: rememberMe ? '30d' : '1d'});
});


const addUser = (req, res) => {
    let {first_name, last_name, email, user_name, password} = req.body;
    let hash_password = bcrypt.hashSync(password, 10);

    const newUser = new User({
        first_name : first_name,
        last_name : last_name,
        email : email,
        user_name : user_name,
        password : hash_password
    });

    newUser.save()    
    .then((newUser) => {
        res.status(200).json("Add User successfully 😊 👌");
    })
    .catch((error) => {
    res.status(400).json({ message: "Error"});
})
}

const getUsers = async (req, res) => {
    const users = await User.find().sort({first_name:-1});
    return (users) ? (res.status(200).json(users)) : (res.status(403).json("error"));
}

const getUser = async (req, res) => {
    let idUser = req.params.id;
    await User.findById(idUser)
    .then((user) => {

        res.status(203).json(user);
    })
    .catch((error) => {

        res.status(404).json('Invalid user ID');
    });
}

const searchUser = async (req, res) => {
    const queryObject = req.query;
    
    if (!queryObject.first_name) {
        res.status(400).json('Missing first_name parameter');
        return;
    }
    
    const users = await User.find({ first_name: queryObject.first_name })
        .sort({ first_name: -1 })
        .limit(10)
        .exec()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(401).json('Invalid username');
        });
}



const updateUser = async (req, res) => {
    try {
        const idUser = req.params.id;
        const userUpdate = req.body;
        const timeInMss = Date.now();
        userUpdate.last_update = timeInMss;

        const doc = await User.findByIdAndUpdate(idUser, userUpdate);

        if (doc) {
            res.status(200).json("User updated");
        } else {
            res.status(404).json("User not found");
        }
    } catch (error) {
        // Handle errors, e.g., database connection issues
        console.error(error);
        res.status(500).json("User not found");
    }
};


const deleteUser = async (req, res) => {
    let idUser = req.params.id;
    User.findByIdAndDelete(idUser)
    .then((user) => {
        res.status(200).json("user deleted successfully");
    })
    .catch((error) => {
        res.status(404).json("invalid user id");
    })
}

module.exports = {logUser, addUser, getUsers, getUser, searchUser, updateUser, deleteUser};