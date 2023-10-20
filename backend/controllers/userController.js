const User = require('../models/User');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');
const axios = require('axios');
const SECRET_KEY = process.env.JWT_SECRET;

const logUser = async (req, res) =>{

    const {user_name, password, rememberMe } = req.body;
    
    if (!user_name || !password) {
        res.status(400)
        throw new Error('all Field are required');
    }
    const userFound = await User.findOne({user_name});
    if(!userFound.active) res.status(401).json('your account desactivated');
    if(userFound && userFound.password){
        let access_Token = accessToken(userFound._id, userFound.role, rememberMe);
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('token', access_Token);
        } else {
            console.log('localStorage is not available in this environment.');
        }
        let refresh_Token = refreshToken(userFound._id, userFound.role, rememberMe);

        res.status(200).json({ message: "Logged in successfully" , status:200, data: userFound,access_Token,refresh_Token});
    }else {
        res.status(401).json('Invalid email or username');
    }
}

const accessToken = ((id, role, rememberMe) => {
    return jwt.sign({id, role, rememberMe}, SECRET_KEY, {expiresIn: rememberMe ? '10d' : '1d'});
});

const refreshToken = (id, role, rememberMe)=>{
    return jwt.sign({id, role, rememberMe},process.env.REFREFRESH_TOKEN_SECRET,{expiresIn : '10d'})
};

const generateUsername = ((firstname, lastname) => {
    let username = firstname.slice(0, 3) + lastname.slice(0, 3);
    return username;
});

const addUser = (req, res) => {
    let {first_name, last_name, email, password} = req.body;
    if (!first_name|| !last_name|| !email || !password) {
        res.status(400)
        throw new Error('all Field are required');
    }

    // let hash_password = bcrypt.hashSync(password, 10);
    let hash_password = md5(password);
    
    const newUser = new User({
        first_name : first_name,
        last_name : last_name,
        user_name : generateUsername(first_name, last_name),
        email : email,
        password : hash_password
    });
    
    newUser.save()    
    .then((newUser) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.user,
            pass: process.env.password
            }
        });
        
        let mailOptions = {
            from: 'Prestigious',
            to: email,
            subject: 'Your information',
            text: 'Your username : ' + generateUsername(first_name, last_name) + ' , ' + 'Your password : '+ password
        };
        
        if(transporter.sendMail(mailOptions)){
            res.status(200).json("Add User successfully 😊 👌");
        }else {
            res.status(400).json("Error sending email");
        }
    })
}

const getUsers = async (req, res) => {
    const users = await User.find().sort({first_name:-1}).limit(10).skip(1);
    return (users) ? (res.status(200).json({
        status: 200,
        data: users})) : (res.status(403).json("error"));
}

const getUser = async (req, res) => {
    let idUser = req.params.id;
    await User.findById(idUser)
    .then((user) => {

        res.status(200).json({status:203, data : user});
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
    
    const users = await User.find({first_name: { $regex: new RegExp(queryObject.first_name , 'i')}})
        .sort({ first_name: -1 })
        .limit(10)
        .exec()
        .then((users) => {
            res.status(200).json({status:200, data : users});
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
            res.status(200).json({status:200, message:"user updated successfully"});
        } else {
            res.status(404).json("User not found");
        }
    } catch (error) {
        res.status(500).json("User not found");
    }
};


const deleteUser = async (req, res) => {
    let idUser = req.params.id;
    User.findByIdAndDelete(idUser)
    .then((user) => {
        res.status(200).json({status:200, message:"user deleted successfully"});
    })
    .catch((error) => {
        res.status(404).json("invalid user id");
    })
}

module.exports = {logUser, addUser, getUsers, getUser, searchUser, updateUser, deleteUser};