const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
<<<<<<< HEAD
const { getAllCategory, addCatergory, deleteCategory, getallMainCategory, getCategoryByMaincategory, updateCategory, fixmaincategory } = require("../../controllers/categoryController");
=======
const { getAllCategory, addCatergory, deleteCategory, getallMainCategory, getCategoryByMaincategory, fixmaincategory } = require("../../controllers/categoryController");
>>>>>>> d7c4d02345e38b04c41d02aff4200148aac2e046
const router = express.Router();
// const authController = require("../controller/authController");

router.post("/addCategory", addCatergory);
<<<<<<< HEAD
router.get("/updateCateogry", updateCategory);
=======
// router.get("/updateCateogry", updateCategory);
>>>>>>> d7c4d02345e38b04c41d02aff4200148aac2e046

router.get('/getAllCategory', getAllCategory)

router.get('/getCategory/:name', getAllCategory)
router.get('/getallmaincategory', getallMainCategory)
<<<<<<< HEAD
router.get('/fixmaincategory', fixmaincategory)
=======
>>>>>>> d7c4d02345e38b04c41d02aff4200148aac2e046

router.get('/getCategoryByMainCategory/:mainCategoryId', getCategoryByMaincategory);

router.delete('/deleteCategory/:id', deleteCategory);
// router.put("/updateCategory", otpLogin);

// router.post("/login", authController.login);

module.exports = router;
