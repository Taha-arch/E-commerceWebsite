// const { error } = require('winston');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory')



const addCategory = async (req, res) => {

    try {
        const { category_name, active } = req.body;
        
        if (!category_name) {
            return res.status(400).json({ message: "No category name provided" });
        }

        // Check if a category with the same name already exists
        const existingCategory = await Category.findOne({ category_name });

        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const newCat = new Category({
            category_name: category_name,
            active: active
        });

        const savedCat = await newCat.save();

        res.status(201).json({ message: "Category created successfully", savedCat });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Failed to add category" });
    }
};


    const Pagination = (req) => {
        const pageNumber = !isNaN(req.query.page) ? parseInt(req.query.page) : 1;
    
        if (pageNumber < 1) {
            console.log("Invalid Page Number");
            // Handle the error, such as returning a response or throwing an error
        }
    
        const limitPerPage = 10;
        const skipVal = (pageNumber - 1) * limitPerPage;
    
        return {
            limitPerPage,
            skipVal
        };
    };

    const getAllCategories = async (req, res) => {
        const { limitPerPage, skipVal } = Pagination(req);
        // .limit(limitPerPage).skip(skipVal)
        const categories = await Category.find().sort({category_name:-1});
        
        res.status(200).json({categories});
    };



    const searchCategory = async (req, res) => {
        try {
            const { limitPerPage, skipVal } = Pagination(req);
            const queryObject = req.query.category_name;

            const categories = await Category.find({ category_name: new RegExp(`^${queryObject}`, 'i') })
                .sort({ category_name: -1 })
                .limit(limitPerPage)
                .skip(skipVal);
                
                if (!categories) {
                    res.status(404).json({ message: 'No Categories found.' });
                }
                res.status(200).json({categories});
            
            
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while searching for categories.' });
        }
    };
    




    const getCategory = async (req, res) => {

        const idCat = req.params.id;
        await Category.findById(idCat)
        .then((category) => {res.status(200).json({status:200, data : category});
    })
    .catch((error) => {
        res.status(404).json('No category found with the provided Id');
    });
    }



    const updateCategory = async (req, res) => {
        try {
            const idCat = req.params.id;
            const catUpdate = req.body;

            const cat = await Category.findByIdAndUpdate(idCat, catUpdate);

            if (cat) {
                res.status(200).json({status:200, message : "category updated successfully"})
            }else {
                res.status(404).json( "invalid category id");
            }
        } catch (error) {
            res.status(500).json("category already exist")
        }
    };

    const deleteCategory = async (req, res) => {
        try {
            const idCat = req.params.id;
            
            //check the existance of subCategories
            const subCategoryCount = await Subcategory.countDocuments({ categoryId : idCat });

            if (subCategoryCount >  0){
                return res.status(400).send(`This category has ${subCategoryCount} associated sub-categories and cannot be deleted.`);
            }
            await Category.findByIdAndDelete(idCat);
            res.status(200).json("category deleted successfully");
        } catch (error) {
            res.status(404).json(error.message)
        }
    }

    module.exports ={addCategory, getAllCategories, searchCategory, getCategory, updateCategory, deleteCategory};
 