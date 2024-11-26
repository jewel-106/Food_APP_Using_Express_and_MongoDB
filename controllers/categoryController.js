const categoryModel = require("../models/categoryModel");



// create category
const createCategoryController = async(req,res) => {
    try{
        const {title,imageUrl} = req.body;
        //validation
        if(!title){
            return res.status(500).send({
                success:false,
                message:'Please Provide category title'
            })
        }
        const newCategroy = new categoryModel({title,imageUrl});
        await newCategroy.save()
        res.status(201).send({
            success:true,
            message:'Category Created Successfully',
            newCategroy
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in category create',
            error
        })
    }

};

// get all category
const getAllCategroyController = async(req,res) =>{
    try{
       const categories = await categoryModel.find({})
       if(!categories){
        return res.status(404).send({
            success:false,
            message:'No Categroy found'
        })
       }
       res.status(200).send({
        success:true,
        totalCategroy: categories.length,
        categories
       })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get All category',
            error
        })
    }

};
// update category
const updateCategoryController = async(req,res) => {
    try{
        const {id}  = req.params;
        const {title,imageUrl} = req.body
        const updateCategory = await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true})
        if(!updateCategory){
            return res.status(500).send({
                success:false,
                message:'No Category Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Category Updated Successfully',
            updateCategory
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Update category',
            error
        })
    }
};

// Delete category
const deleteCategoryController = async(req,res) => {
    try{
        const {id} = req.params
        if(!id){
            return res.status(500).send({
                success:false,
                message:'Please provide Category ID'
            })
        }
        const category = await categoryModel.findById(id);
        if(!category){
            return res.status(500).send({
                success:false,
                message:'No Category Found with this id'
            })
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:'Category Deleted Successfully',
            category
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Delete category',
            error
        })
    }
}

module.exports = { createCategoryController,getAllCategroyController,updateCategoryController,deleteCategoryController}