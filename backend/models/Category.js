const mongoose = require('mongoose');
var uuid = require('node-uuid');

const CategorySchema = new mongoose.Schema({
    id: {
         type: String, default: () => uuid.v4() 
        },
        category_name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        active: {
            type: Boolean,
            enum: ['true', 'false'],
            default: true,
        }
});

module.exports = mongoose.model("Category", CategorySchema);