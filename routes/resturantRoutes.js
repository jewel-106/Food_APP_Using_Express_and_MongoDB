

const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController, getAllResturantController, getResturantControllerByID, deleteResturantController } = require('../controllers/resturantController');


const router = express.Router()

//routes

//Create 
// Create resturant || post
router.post('/create',authMiddleware,createResturantController)
// Get all resturant || GET
router.get('/getAll',getAllResturantController)
// Get Resturant By ID || GET
router.get('/get/:id',getResturantControllerByID)
// Delete Resturant || DELETE
router.delete('/delete/:id',authMiddleware,deleteResturantController)

module.exports = router;