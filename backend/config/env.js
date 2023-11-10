const dotenv = require('dotenv').config();
module.exports = {
    API_SECRET : process.env.API_SECRET,
    API_KEY : process.env.API_KEY,
    CLOUD_NAME: process.env.CLOUD_NAME
}