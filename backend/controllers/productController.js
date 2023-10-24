const Product = require('../models/Product');


const addProduct = (req, res) => {
    let {sku, product_image, product_name, subcategory_id, short_description, long_description, quantity, price,discount_price, options} = req.body;
    if(!sku || !product_image || !product_name|| !subcategory_id|| !price){
        return res.status(400).json({status: 400, message:"sku, product image, product name, subCategory Id and the price are required!!"});
    }

    let newProduct = new Product({
        sku: sku,
        product_image: product_image,
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
    const products = await Product.find().limit(10);
    if(products) {
        res.status(200).json({status:200, data:products});
    }else{
        res.status(200).json({status:200, message:"there's no product"});
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
    let idProduct = req.params.id;
    await Product.findById(idProduct)
    .then((product) => {
        res.status(200).json({status:203, data : product});
    })
    .catch((error) => {
        res.status(404).json('Invalid product ID');
    });
}

const updateProduct = async (req, res) => {
    
    try {
        const idProduct = req.params.id;
        const productUpdate = req.body;
        const doc = await Product.findByIdAndUpdate(idProduct, productUpdate);
        if (doc) {
            res.status(200).json({status:200, message:"product updated successfully"});
        } else {
            res.status(404).json("Product not found");
        }
    } catch (error) {
        
        res.status(500).json("Error");
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

