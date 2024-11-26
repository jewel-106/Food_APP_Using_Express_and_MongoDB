const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

// Create Food
const createFoodController = async(req,res) =>{
    try{
        const {title,description,price,imageUrl,foodTags,category,code,isAvailable,resturant,rating} = req.body;
        if(!price || !title || !description || !resturant){
            return res.status(500).send({
                success:false,
                message:'Please Provide all Fields'
            })
        }
        const newFood = new foodModel({title,description,price,imageUrl,foodTags,category,code,isAvailable,resturant,rating});
        await newFood.save();
        res.status(201).send({
            success:true,
            message:'New Food Item Created Successfully',
            newFood
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Create Food',
            error
        })
    }

};

// Get All Foods
const getAllFoodsController = async(req,res) => {
    try{
        const foods = await foodModel.find({})
        if(!foods){
            return res.status(404).send({
                success:false,
                message:'No food items was found'
            })
        }
        res.status(200).send({
            success:true,
            message:'All Foods Get Successfully',
            totalFoods: foods.length,
            foods
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get All Foods',
            error
        })
    }

};
//Get Single food by Id
const getFoodByIdController = async(req,res) => {
    try{
        const foodId = req.params.id;
        if(!foodId){
            return res.status(500).send({
                success:false,
                message:'Please Provide Id'
            })
        };
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:'No food found'
            })
        };
        res.status(200).send({
            success:true,
            message:'Foods Get Successfully',
            food
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get Foods',
            error
        })
    }
};
// Get Food By Resturant
const getFoodByResturantIdController = async(req,res) => {
    try{
        const restId = req.params.id;
        if(!restId){
            return res.status(500).send({
                success:false,
                message:'Please Provide Id'
            })
        };
        const food = await foodModel.find({resturant:restId});
        if(!food){
            return res.status(404).send({
                success:false,
                message:'No food found'
            })
        };
        res.status(200).send({
            success:true,
            message:'Foods Based on Resturant',
            food
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get Foods',
            error
        })
    }
};
// updat food items
const updateFoodControoler = async (req,res) => {
    try{
        const foodId = req.params.id;
        if(!foodId){
            return res.status(500).send({
                success:false,
                message:'Please Provide Id'
            })
        }
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:'No foood found'
            })
        };
        const {title,description,price,imageUrl,foodTags,category,code,isAvailable,resturant,rating} = req.body;

        const updatedFood = await foodModel.findByIdAndUpdate(foodId,{title,description,price,imageUrl,foodTags,category,code,isAvailable,resturant,rating},{new:true});
        res.status(200).send({
            success:true,
            message:'Food items was updated',
            updatedFood
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in update Foods',
            error
        })
    }

};
//update Food
const deleteFoodController = async(req,res)=>{
    try{
        const foodId = req.params.id
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'Provide Food Id'
            })
        }
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:'Food Not Found'
            })
        }
        await  foodModel.findByIdAndDelete(foodId);
        res.status(200).send({
            success:true,
            message:'Food Item Deleted Successfullly',
            food
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in update Foods',
            error
        })
    }
};

//Place order
const placeOrderController = async(req,res) => {
    try{
        const {cart} = req.body;
        if(!cart){
            return res.status(50).send({
                success:false,
                message:'Please food cart ro payment method'
            })
        }
        let total = 0;
        // calculate
        cart.map((i) =>{
            total += i.price
        })

        const newOrder = new orderModel({
            foods:cart,
            payment:total,
            buyer:req.body.id,
            //status:'deliverd'
            
        })
        await newOrder.save();
        res.status(201).send({
            success:true,
            message:'Order Place successfully',
            newOrder
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in place Order',
            error
        })
    }
};
// change order status
const orderStatusConttroller = async(req,res) =>{
    try{
        const orderId = req.params.id
        if(!orderId){
            return res.status(404).send({
                success:false,
                message:'Please Provide valid id'
            })
        }
        const {status} = req.body
        const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true});
        res.status(200).send({
            success:true,
            message:'Order Status updated Successfully'
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Change Status',
            error
        })
    }
}
module.exports = { createFoodController,getAllFoodsController,getFoodByIdController,getFoodByResturantIdController,updateFoodControoler,deleteFoodController,placeOrderController,orderStatusConttroller};