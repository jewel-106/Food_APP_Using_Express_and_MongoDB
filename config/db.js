

const mongoose = require('mongoose');
const colors = require('colors');


// function mongdb database connection

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to Database ${mongoose.connection.host}`.bgRed);
        console.log(`Connected to Database ${mongoose.connection.host}`.bgGreen);
        console.log(`Connected to Database ${mongoose.connection.host}`.bgBlue);
        console.log(`Connected to Database ${mongoose.connection.host}`.bgRed);
        console.log(`Connected to Database ${mongoose.connection.host}`.bgBlue);
        console.log(`Connected to Database ${mongoose.connection.host}`.bgRed);
        console.log(`Connected to Database ${mongoose.connection.host}`.bgGreen);
        console.log(`Connected to Database ${mongoose.connection.host}`.bgBlue);
    }catch(error){
        console.log('Db Error ',error);
    }
}
module.exports = connectDb;