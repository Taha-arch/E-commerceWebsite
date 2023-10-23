const User = require('../models/User');
const generator = require('generate-password');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');
const SECRET_KEY = process.env.JWT_SECRET;


const logUser = async (req, res) =>{
    const {user_name, password, rememberMe } = req.body;
    
    if (!user_name || !password){
        res.status(400)
        throw new Error('all Field are required');

    }
    const userFound = await User.findOne({user_name});
    if(!userFound.active) res.status(401).json('your account desactivated');
    if(userFound && userFound.password){
        let access_Token = accessToken(userFound._id, userFound.role, rememberMe, 3);
        let refresh_Token = refreshToken(userFound._id, userFound.role, rememberMe, 12);

        res.status(200).json({ message: "Logged in successfully" , status:200, data: userFound,access_Token,refresh_Token});
    }else {
        res.status(401).json('Invalid email or username');
    }
}

const accessToken = ((id, role, rememberMe, time) => {
    return jwt.sign({id, role, rememberMe}, SECRET_KEY, {expiresIn: rememberMe ? time+'d' : '1d'});
});


const refreshToken = (id, role, rememberMe, time)=>{
    return jwt.sign({id, role, rememberMe},process.env.REFREFRESH_TOKEN_SECRET,{expiresIn : time+'d'})
};

const generateUsername = ((firstname, lastname) => {
    let username = firstname.slice(0, 3) + lastname.slice(0, 3);
    return username;
});

const generertePassword = () => {
    const password = generator.generateMultiple(1,{
        length: 10,
        uppercase: true,
        lowercase: true,
        symbols: true,
        numbers: true,
    });
return password;
}

const addUser = (req, res) => {
    let {first_name, last_name, email} = req.body;
    if (!first_name|| !last_name|| !email) {
        res.status(400)
        throw new Error('all Field are required');
    }
    let password = generertePassword();

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
            res.status(200).json({status:200, message:"Add User successfully 😊 👌"});
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
    try {
    const queryObject = req.query;

    if (!queryObject.first_name) {
        res.status(400).json('Missing first_name parameter');
        return;
    }
    const users = await User.find({first_name: { $regex: new RegExp(queryObject.first_name , 'i')}})
    .sort({ first_name: -1 })
    .limit(10)
    .exec()
    
    if (users.length === 0) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({status:200, data : users});
    
    } catch (error) {
        console.error('Error searching for a user by first_name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
};


const updateUser = async (req, res) => {
    
        const idUser = req.params.id;
        const userUpdate = req.body;
        const timeInMss = Date.now();
        userUpdate.last_update = timeInMss;
        const exist = await User.findOne({
                $or: [
                    {last_name:userUpdate.last_name},
                    {email:userUpdate.email}
                ]});

        if(exist) return res.status(400).json({message : `already exist`});

        const doc = await User.findByIdAndUpdate(idUser, userUpdate);
        if (doc) {
            res.status(200).json({status:200, message:"user updated successfully"});
        } else {
            res.status(404).json("User not found");
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

