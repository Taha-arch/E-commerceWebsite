const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinariConfig'); // adjust the path

const usersStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    folder: 'users_images',
    format: async (req, file) => 'jpg', // set the format to 'jpg' or whatever you prefer
    public_id: (req, file) => file.filename + '-' + Date.now(),
    },
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    folder: 'product_images',
    format: async (req, file) => 'jpg', // set the format to 'jpg' or whatever you prefer
    public_id: (req, file) => file.filename + '-' + Date.now(),
    },
});



const upload = multer({ storage: storage });
const uploadUserImage = multer({ storage: usersStorage});

module.exports = upload;
module.exports = uploadUserImage;