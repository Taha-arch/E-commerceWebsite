const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validate = require("validator");
const { isEmail } = validate;
var uuid = require('node-uuid');

const CustomerSchema = new mongoose.Schema({

    id: {
       type: String,
        default: uuid.v1 
      },
    first_name: {
       type: String,
        minlength: 3,
         required: true 
      },
    last_name: {
       type: String,
        minlength: 3,
         required: true 
      },
    email: { 
      type: String,
      required: [true, 'email is required'],
      trim: true,
      lowercase: true,
      unique: true,
      validate: [isEmail, 'invalid email']
    },
    customer_image: {
      type: String,
      required: false,
  },
    password: {
       type: String, 
       required: true ,
       min: 8
      },
    creation_date: {
       type: Date,
        default: Date.now, 
      },
    last_login: {
       type: Date,
        default: Date.now, 
      },
    valid_account: {
       type: Boolean,
        default: 'false' 
      },
    active: {
       type: Boolean,
       enum: ['true', 'false'],
       default: 'false' 
      },
      Phone: {
        type: Boolean,
        type: String, 
      }
  });


  module.exports = mongoose.model("Customer", CustomerSchema);