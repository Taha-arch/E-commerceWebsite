const Product = require('../models/Product');
const Subcategory = require('../models/Category');
const Category = require('../models/Category');

const addProduct = (req, res) => {
    let {sku, product_name, subcategory_id, short_description, long_description, quantity, price,discount_price, options} = req.body;
    
    if(!sku|| !product_name|| !subcategory_id|| !price){
        return res.status(400).json({status: 400, message:"sku, product name, subCategory Id and the price are required!!"});
    }
    const urlProductImage = req.file ? req.file.path : null;
    let newProduct = new Product({
        sku: sku,
        product_image: urlProductImage,
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

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .limit(10)
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


const searchProducts = async (req, res) => {
    try {
        const queryObject = req.query;
    
        if (!queryObject.product_name) {
            res.status(400).json('Missing product_name parameter');
            return;
        }
        const products = await Product.find({product_name: { $regex: new RegExp(queryObject.product_name , 'i')}})
        .sort({ product_name: -1 })
        .limit(10)
        .exec()
        
        if (products.length === 0) {
            return res.status(404).json({ message: 'product not found' });
        }
        
        res.status(200).json({status:200, data : products});
        
        } catch (error) {
            console.error('Error searching for a product by product_name:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            }
}

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
    try {
        const idProduct = req.params.id;
        const productUpdate = req.body;
        
        const productName = await Product.findOne({product_name :productUpdate.user_name});
        if(productName) return res.status(400).json({message : `product name already exist`});

        const doc = await Product.findByIdAndUpdate(idProduct, productUpdate);
        if (doc) {
            res.status(200).json({status:200, message:"product updated successfully"});
        } else {
            res.status(404).json("Product not found");
        }
        }catch (error) {
        
        res.status(500).json(error.message);
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

module.exports = {addProduct, getAllProducts, searchProducts, getProduct, updateProduct, deleteProduct};

