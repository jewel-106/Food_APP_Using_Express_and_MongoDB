

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodsController, getFoodByIdController, getFoodByResturantIdController, updateFoodControoler, deleteFoodController, placeOrderController, orderStatusConttroller } = require('../controllers/foodController');
const adminMiddleware = require('../middlewares/adminMiddleware');



const router = express.Router()

//routes
// Create Food || POST
router.post('/create',authMiddleware,createFoodController)
//Get All Food
router.get('/getAll',getAllFoodsController)
// Get Single Food
router.get('/get/:id',getFoodByIdController)
// Get Food by Resturant
router.get('/getByResturant/:id',getFoodByResturantIdController);
// Update food by Id
router.put('/update/:id',authMiddleware,updateFoodControoler);
// Delete Food
router.delete('/delete/:id',authMiddleware,deleteFoodController);

//Place Order
router.post('/placeorder',authMiddleware,placeOrderController);

// Oder Status
router.post('/orderStatus/:id',authMiddleware,adminMiddleware,orderStatusConttroller)
module.exports = router;