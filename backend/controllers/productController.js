const Product = require('../models/Product');
const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category');
const cloudinary = require("cloudinary").v2;

const addProduct = (req, res) => {
    let {sku, product_name, subcategory_id, short_description, long_description, quantity, price,discount_price, options} = req.body;
    
    if(!sku){
        return res.status(400).json({status: 400, message:"sku is required!!"});
    }else if(!product_name){
        return res.status(400).json({status: 400, message:"product name is required!!"});
    }
    else if(!subcategory_id){
        return res.status(400).json({status: 400, message:"subcategory id is required!!"});
    }else if(!price){
        return res.status(400).json({status: 400, message:"price is required!!"});
    }else{
        
        let ms = Date.now();
        const urlProductImages = req.files ? req.files.map(file => file.path) : null;;
        let newProduct = new Product({
            sku: sku + ms,
            product_image: urlProductImages,
            product_name: product_name,
            subcategory_id: subcategory_id,
            short_description: short_description,
            long_description: long_description,
            price: price,
            discount_price: discount_price,
            quantity: quantity,
            options: options
        })
        
        newProduct.save()
        .then((newProduct) =>{
            return res.status(201).json({status: 201, message:"product created successfully"});
        })
        .catch((error) => {
            return res.status(500).json({ error: 'Internal Server Error' });
        });
    }
    }
    
    const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = 10;
        const skip = (page - 1) * limit; 
        
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);
        
        const products = await Product.find().sort({creation_date:-1})
            .populate({ path: 'subcategory_id', select: 'subcategory_name', 
            populate: {
                path: 'category_id',
                select: 'category_name'
            } })
            .exec();

        if (products) {
            const formattedProducts = products.map((product) => ({
                "_id": product._id,
                "sku": product.sku,
                "productImage": product.product_image,
                "productName": product.product_name,
                "categoryName": product.subcategory_id ? product.subcategory_id.category_id.category_name : null,
                "subcategoryName": product.subcategory_id ? product.subcategory_id.subcategory_name : null,
                "shortDescription": product.short_description,
                "longDescription": product.long_description,
                "price": product.price,
                "quantity": product.quantity,
                "discountPrice": product.discount_price,
                "active": product.active
            }));

            res.status(200).json({ status: 200, data: formattedProducts });
        } else {
            res.status(400).json({ status: 400, message: "There are no products" });
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const getAllProductAscPrice = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = 10;
        const skip = (page - 1) * limit; 
        
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);
        
        const products = await Product.find().sort({price:1})
            .populate({ path: 'subcategory_id', select: 'subcategory_name', 
            populate: {
                path: 'category_id',
                select: 'category_name'
            } })
            .exec();

        if (products) {
            const formattedProducts = products.map((product) => ({
                "_id": product._id,
                "sku": product.sku,
                "productImage": product.product_image,
                "productName": product.product_name,
                "categoryName": product.subcategory_id ? product.subcategory_id.category_id.category_name : null,
                "subcategoryName": product.subcategory_id ? product.subcategory_id.subcategory_name : null,
                "shortDescription": product.short_description,
                "longDescription": product.long_description,
                "price": product.price,
                "quantity": product.quantity,
                "discountPrice": product.discount_price,
                "active": product.active
            }));

            res.status(200).json({ status: 200, data: formattedProducts });
        } else {
            res.status(400).json({ status: 400, message: "There are no products" });
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}


const searchProducts = async (req, res, next) => {
    try {
      const queryObject = req.query;
      if ('product_name' in queryObject && queryObject.product_name.trim() !== '') {
        const products = await Product.find({
          product_name: { $regex: new RegExp(queryObject.product_name, 'i') },
        })
          .sort({ product_name: -1 })
          .limit(10)
          .populate({ path: 'subcategory_id', select: 'subcategory_name', 
            populate: {
                path: 'category_id',
                select: 'category_name'
            } })
          .exec();
        if (products.length === 0) {
          return res.status(404).json({ message: 'Product not found' });
        }
        const formattedProducts = products.map((product) => ({

                "_id": product._id,
                "sku": product.sku,
                "productImage": product.product_image,
                "productName": product.product_name,
                "categoryName": product.subcategory_id ? product.subcategory_id.category_id.category_name : null,
                "subcategoryName": product.subcategory_id ? product.subcategory_id.subcategory_name : null,
                "shortDescription": product.short_description,
                "longDescription": product.long_description,
                "price": product.price,
                "quantity": product.quantity,
                "discountPrice": product.discount_price,
                "active": product.active
        }));
        res.status(200).json({ status: 200, data: formattedProducts });
      } else {
        return res.status(400).json({ message: 'Product name is required for search' });
      }
    } catch (error) {
      console.error('Error searching for a product by product_name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

const getProduct = async (req, res) => {
    try{
        let idProduct = req.params.id;
        const product = await Product.findById(idProduct)
        .populate({ path: 'subcategory_id', select: 'subcategory_name', 
            populate: {
                path: 'category_id',
                select: 'category_name'
            } })
            .exec();
        if(product){
            const formattedProducts = {
                "_id": product._id,
                "sku": product.sku,
                "productImage": product.product_image,
                "productName": product.product_name,
                "categoryName": product.subcategory_id ? product.subcategory_id.category_id.category_name : null,
                "subcategoryName": product.subcategory_id ? product.subcategory_id.subcategory_name : null,
                "shortDescription": product.short_description,
                "longDescription": product.long_description,
                "price": product.price,
                "quantity": product.quantity,
                "discountPrice": product.discount_price,
                "active": product.active
            };

            res.status(200).json({ status: 200, data: formattedProducts });
        }else{
            res.status(400).json("product not found");
        }

    }catch(error){
        res.status(404).json(error);
    };
}

const updateProduct = async (req, res) => {
    
    const idProduct = req.params.id;
    const productUpdate = req.body;

    const productExist = await Product.findOne({ _id: { $ne: idProduct},product_name:productUpdate.product_name});
    if(productExist) return res.status(402).json({message : `Product already exist`});
    
    const skuExist = await Product.findOne({ _id: { $ne: idProduct}, sku :productUpdate.sku});
    if(skuExist) return res.status(400).json({message : `sku already exist`});

    if (Array.isArray(productUpdate.product_image) && productUpdate.product_image.length > 0) {
        const updatedImages = [];
        for (const image of productUpdate.product_image) {
          const timeInMss = Date.now();
          const newImage = await cloudinary.uploader.upload(image, {
            folder: "product_images/" + timeInMss,
            width: 1000,
            crop: "scale",
          });
          updatedImages.push(newImage.secure_url);
        }
        productUpdate.product_image = updatedImages;
      }

    const doc = await Product.findByIdAndUpdate(idProduct, productUpdate);
    if (doc) {
        res.status(200).json({status:200, message:"Product updated successfully"});
    } else {
        res.status(404).json("Product not found");
    }

};

const deleteProduct = async (req, res) => {
    let idProduct = req.params.id;
    Product.findByIdAndDelete(idProduct)
    .then((user) => {
        res.status(200).json({status:200, message:"product deleted successfully"});
    })
    .catch((error) => {
        res.status(404).json("invalid product id");
    })
}

module.exports = {addProduct, getAllProducts, searchProducts, getProduct, updateProduct, deleteProduct, getAllProductAscPrice};

