const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinariConfig'); 

const usersStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'users_images',
        format: async (req, file) => 'jpg',
        public_id: (req, file) => file.filename + '-' + Date.now(),
    },
});
const customersStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'customers/images',
        format: async (req, file) => 'jpg',
        public_id: (req, file) => file.filename + '-' + Date.now(),
    },
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'product_images',
        format: async (req, file) => 'jpg',
        public_id: (req, file) => file.filename + '-' + Date.now(),
    },
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5} // Adjust the file size limit (5 MB )
});
const uploadMultipleImages = upload.array('product_image', 4);

const uploadUserImage = multer({
    storage: usersStorage,
    limits: { fileSize: 50 }, // Adjust the file size limit (5 MB in this example)
}).single('user_image');


const uploadCustomerImage = multer({
    storage: customersStorage,
    limits: { fileSize: 50 }, // Adjust the file size limit (5 MB in this example)
}).single('customer_image');

module.exports = { upload, uploadUserImage, uploadCustomerImage, uploadMultipleImages }; 
