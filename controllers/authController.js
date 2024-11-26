const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');


//Register
const registerController = async (req,res) =>{
    try{
        const { username,email,password,phone,address,answer,usertype } = req.body;
        //Validation
        if(!username || !email || !password || !password || !phone || !answer){
            return res.status(500).send({
                success:false,
                message:'Please Provide All Fields'
            })
        }
        //check user
        const existing = await userModel.findOne({email});
        if(existing) {
            return res.status(500).send({
                success:false,
                message: 'Email Already Registerd please Login',
            })
        }
        //Hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // Create new user
        const user = await userModel.create({username,email,password:hashedPassword,address,phone,answer,usertype})
        res.status(201).send({
            success:true,
            message:'Successfully Registered ',
            user,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in register API',
            error
        })
    }

};


// LOGIN
const loginController = async (req,res) => {
    try{
        const {email,password } = req.body
        //validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:'Please Provide Email or Password'
            })
        }
        //Check User
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not Found'
            })
        }

        //check user password  | compare password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials",
            });
        }
        // sign for encrypt
        // token
        const token = JWT.sign({id:user._id}, process.env.JWT_SECRET,{
            expiresIn:'7d',
        })
        user.password = undefined;
        res.status(200).send({
            success:true,
            message:'Login Successfully',
            token,
            user,
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message:'Error in login api',
            err
        })
    }

}
module.exports = { registerController,loginController }