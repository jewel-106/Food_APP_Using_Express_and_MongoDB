

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategoryController, getAllCategroyController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryController');


const router = express.Router()

//routes
// Create category
router.post('/create',authMiddleware,createCategoryController);
// Categroy get all
router.get('/getAll',getAllCategroyController);
// Update Category
router.put('/update/:id',authMiddleware,updateCategoryController);
// Delete Category
router.delete('/delete/:id',authMiddleware,deleteCategoryController)
module.exports = router;