

const express = require('express');
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware')


const router = express.Router()

//routes

// GET USER || GET
router.get('/getUser',authMiddleware,getUserController);

// UPDATE PROFILE 
router.put('/updateUser',authMiddleware,updateUserController);

//RESET Password
router.post('/resetPassword',authMiddleware,resetPasswordController)
//UPDATE Password
router.post('/updatePassword',authMiddleware,updatePasswordController)
// Delete User
router.delete('/deleteUser/:id',authMiddleware,deleteProfileController)

module.exports = router;