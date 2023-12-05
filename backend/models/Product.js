const mongoose = require('mongoose');
const uuid = require('node-uuid');

const ProductSchema = new mongoose.Schema({
        id: {
            type: String,
            default: uuid.v1
        },
        sku: {
            type: String,
            required: true,
            unique: true
        },
        product_image: {
            type: Array,
            required: true
        },
        product_name: {
            type: String,
            required: true,
            unique:true
        },
        subcategory_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subcategory'
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        short_description : {
            type: String,
            min: 25
        },
        long_description :{
            type: String,
            min: 40
        },
        price :{
            type: Number,
            required: true
        },
        discount_price :{
            type: Number,
            default: null
        },
        quantity: {
            type: Number,
            default:0
        },
        options: {
            type: Array
        },
        active: {
            type: Boolean,
            require: true,
            enum : ['true', 'false'],
            default:'true'
        },
        creation_date: {
            type: Date,
            default: Date.now
        },

}, { strictPopulate: false });
module.exports = mongoose.model('Product', ProductSchema);