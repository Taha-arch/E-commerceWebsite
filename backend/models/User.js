const mongoose = require('mongoose');
const validate = require("validator");
const { isEmail } = validate;
var uuid = require('node-uuid');

const UserSchema = new mongoose.Schema({

        id: {
            type: String,
            default: uuid.v1
        },
        first_name: {
            type: String,
            required: true,
            minlength: 3,
            max: 50
        },
        last_name: {
            type: String,
            required: true,
            minlength: 3,
            max: 50,
            unique: true
        },
        email: {
            type: String,
            required: [true,'Email address is required'],
            trim: true,
            lowercase: true,
            max: 50,
            unique: true,
            validate: [isEmail, 'invalid email']
        },
        user_image: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            default: 'Manager'
        },
        user_name: {
            type: String,
            required: true,
            minlength: 4,
            max: 20,
            unique: [true, 'username must be unique']
        },
        password: {
            type: String,
            required: true,
            min: 8
        },
        rememberMe: {
            type: Boolean,
            enum: ['true', 'false'],
            default: 'false'
        },
        creation_date: {
            type: Date,
            default: Date.now
        },
        last_login: {
            type: Date,
            default: Date.now
        },
        last_update: {
            type: Date,
            default: Date.now
        },
        active: {
            type: Boolean,
            enum: ['true', 'false'],
            default: 'true'
        } 
});

module.exports = mongoose.model("User", UserSchema);
