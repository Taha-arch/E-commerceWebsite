const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const Product = require('../models/Product')



const addSubcategory = async (req, res) => {
    try {
        const { subcategory_name,category_id, active } = req.body;
        
        if (!subcategory_name) {
            return res.status(400).json({ message: "No Subcategory name provided" });
        }

        // Check if a category with the same name already exists
        const existingSubcategory = await Category.findOne({ subcategory_name });

        if (existingSubcategory) {
            return res.status(400).json({ message: "Subcategory already exists" });
        }

        const newSub = new Subcategory({
            subcategory_name: subcategory_name,
            category_id: category_id,
            active: active
        });

        const savedSub = await newSub.save();

        res.status(201).json({ message: "Subcategory created successfully", savedSub });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Failed to add Subcategory" });
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


    const getAllSubcategories = async (req, res) => {
        
        try {
        const{ limitPerPage, skipVal} =  Pagination(req);
            // Find subcategories, populate the 'category' field to get category_name
            const subcategories = await Subcategory.find()
            .sort({subcategory_name:-1})
                .limit(limitPerPage)
                .skip(skipVal)
                .populate('category_id', 'category_name');
    
            res.status(200).json({subcategories});
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve subcategories.' });
        
    } 
};


        

    const searchSubcategory = async (req, res) => {
        try { 
        const{ limitPerPage, skipVal} =  Pagination(req);
       const data = [];
       const queryObject = req.query.subcategory_name;

       
       const subcategories = await Subcategory.find({ subcategory_name: new RegExp(`^${queryObject}`, 'i') }).sort({ subcategory_name: -1 })
       .limit(limitPerPage)
       .skip(skipVal)
       .populate('category_id', 'category_name')
       .exec();

       if (!subcategories) {
        res.status(404).json({ message: 'No Categories found.' });
        
      }
     res.status(200).json(subcategories);


} catch (error) {
 res.status(500).json({ message: 'An error occurred while searching for categories.' });
}
};




    const getSubcategory = async (req, res) => {
        try {
            
        
        const idSub = req.params.id;
       const subcategory =  await Subcategory.findById(idSub).populate('category_id', 'category_name')
       if (!subcategory) {
        res.status(404).json('No Subcategory found with the provided Id');
       }
        res.status(200).json({status:200, data : { subcategory }});
    } catch (error) {
            res.status(500).json({error: 'Failed to retrieve Subcategory'});
    }

    };



    const updateSubcategory = async (req, res) => {
    try {
        const idSub = req.params.id;
        const SubUpdate = req.body;

        const isSubNameExist = await Subcategory.findOne({
            _id: { $ne: idSub }, // Exclude the subcategory being updated
            subcategory_name: SubUpdate.subcategory_name
        });

        if (isSubNameExist) {
            return res.status(400).json({ message: "This name of subcategory already exists" });
        }

        const subcategory = await Subcategory.findByIdAndUpdate(idSub, SubUpdate);

        if (subcategory) {
            return res.status(200).json({ status: 200, message: "Subcategory updated successfully" });
        } else {
            return res.status(404).json({ message: "Invalid subcategory id" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error updating subcategory" });
    }
};


    const deleteSubcategory = async (req, res) => {
        try {
            const idSub = req.params.id;
            
            //check the existance of Products
             const ProductCount = await Product.countDocuments({ subcategory_id : idSub });

             if (ProductCount >  0){
                 return res.status(400).json({ message :`This Subcategory has ${ProductCount} associated Products and cannot be deleted.`});
             }
            await Subcategory.findByIdAndDelete(idSub);
            res.status(200).json("Subcategory deleted successfully");
        } catch (error) {
            res.status(404).json("invalid Subcategory id")
        }
    }

    module.exports ={addSubcategory, getAllSubcategories, searchSubcategory, getSubcategory, updateSubcategory, deleteSubcategory};
 