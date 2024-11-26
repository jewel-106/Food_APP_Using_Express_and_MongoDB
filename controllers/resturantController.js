const resturantModel = require("../models/resturantModel");


// create resturant
const createResturantController = async(req,res) => {
    try{
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords} = req.body;
        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message:'Please provide title and address',
            });
        }
        const newResturant = new resturantModel({title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords})
        await newResturant.save();
        res.status(201).send({
            success:true,
            message:'New Resturant Created Successfully',
            newResturant
        })


    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Create Resturant API',
            error
        })
    }

};
// get all resturant 
const getAllResturantController = async (req,res) =>{
    try{
        const resturants = await resturantModel.find({});
        if(!resturants){
            return res.status(404).send({
                success:false,
                message:'No Resturant Available'
            });
        }
        res.status(200).send({
            success:true,
            totalCount: resturants.length,
            resturants
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Get All Resturant',
            error
        })
    }
};
// get resturant by id
const getResturantControllerByID = async (req,res) => {
    try{
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'Please Provide Resturant ID'
            });
        }
        const resturant = await resturantModel.findById(resturantId)
        if(!resturant){
            return res.status(404).send({
                success:false,
                message:'No Resturant Found'
            });
        }
        res.status(200).send({
            success:true,
            resturant,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In get Resturant',
            error
        })
    }
};
// delete resturant
const deleteResturantController = async(req,res) => {
    try{
        const resturantId = req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:'Please Provide Resturant ID'
            });
        }
        const resturant = await resturantModel.findById(resturantId);
        if(!resturant){
            return res.status(404).send({
                success:false,
                message:'No Resturant Found'
            });
        }
        await resturantModel.findByIdAndDelete(resturantId);
        res.status(200).send({
            success:true,
            message:'Resturant Deleted Successfully',
            resturant
        })
        

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Delete Resturant',
            error
        })
    }
}
module.exports = { createResturantController,getAllResturantController,getResturantControllerByID,deleteResturantController};