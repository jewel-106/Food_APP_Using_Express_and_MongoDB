
const express = require('express');
const colors  = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./config/db');





// dot env configuration
dotenv.config(); // other path dotenv.config({path: './'})

//DB Connection
connectDb();

// rest object

const app = express();

//middleware
    app.use(cors());
    // json formate data access from client
    app.use(express.json());
    app.use(morgan('dev')); // dev = 

// URL => http://localhost:8000
//routes
app.use('/api/v1/test',require("./routes/testRoutes"));
//auth
app.use('/api/v1/auth',require("./routes/authRoutes"));
// user
app.use('/api/v1/user',require("./routes/userRoutes"));
// resturant
app.use('/api/v1/resturant',require("./routes/resturantRoutes"));
// Category
app.use('/api/v1/category',require("./routes/categoryRoutes"));
// Food
app.use('/api/v1/food',require("./routes/foodRoutes"));


// route 
app.get('/',(req,res) => {
    return res.status(200).send("<h1>Welcome to Food Server APP</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT,() => {
    console.log(`Server Running on port ${PORT}`.white.bgWhite);
})