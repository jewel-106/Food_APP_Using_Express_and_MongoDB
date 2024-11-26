
const testUserController = (req,res) => {
    try{
        // res.status(200).send({
        //     success:true,
        //     message:'test user data API',
        // });
        res.status(200).send("<h1>Test data user</h1>");
    }catch(error){
        console.log('Error in test API ',error);
    }
}

module.exports = { testUserController }