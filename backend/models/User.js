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
            max: 50
        },
        email: {
            type: String,
            required: 'Email address is required',
            trim: true,
            lowercase: true,
            max: 50,
            unique: true,
            validate: [isEmail, 'invalid email']
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
            unique: [true, 'unique']
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
            default: Date.now,
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
