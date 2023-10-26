const mongoose = require('mongoose');
var uuid = require('node-uuid');

const SubcategorySchema = new mongoose.Schema({
    id: {
        type: String, default: () => uuid.v4() 
        },
        subcategory_name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        category_id: {
            type: String,
            ref:'Category',
            required:true
        },
        active: {
            type: Boolean,
            enum: ['true', 'false'],
            default: false,
        }
});

module.exports = mongoose.model("Subcategory", SubcategorySchema);