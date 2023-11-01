const cloudinary = require('cloudinary').v2;
const {API_SECRET ,API_KEY ,CLOUD_NAME} = require('./env')

cloudinary.config({
 cloud_name: CLOUD_NAME,
 api_key: API_KEY,
 api_secret: API_SECRET
});

module.exports = cloudinary;