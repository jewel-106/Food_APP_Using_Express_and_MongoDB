

const mongoose = require('mongoose');

//Schema
const fooodSchema = new mongoose.Schema({
   
    title: {
        type:String,
        required:[true,'Food Title is require']
    },
    description:{
        type:String,
        required:[true,'Food description is Require']
    },
    foodTags:{
        type:String,
    },
    category:{
        type:String
    },
    code:{
        type:String,
    },
    isAvailable:{
        type:Boolean,
        default:true,
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Resturant',
    },
    rating:{
        type:Number,
        default: 5,
        min:1,
        max:5
    },
    price:{
        type:Number,
        required:[true,'Food Price is Require']
    },
    imageUrl:{
        type:String,
        default:'https://www.facebook.com',
    },
    ratingCount:{
        type:String,

    }
   
    },
    { timestamps:true }
);

//export
module.exports = mongoose.model('Foods',fooodSchema);