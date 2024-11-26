

const mongoose = require('mongoose');

//Schema
const categorySchema = new mongoose.Schema({
   
    title:{
        type:String,
        required:[true,'Category title is required']
    },
    imageUrl:{
        type:String,
        default:"https://www.google.com"
    }
    },
    { timestamps:true }
);

//export
module.exports = mongoose.model('Category',categorySchema);