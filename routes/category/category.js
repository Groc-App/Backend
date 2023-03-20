const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
<<<<<<< HEAD
const { getAllCategory, addCatergory, deleteCategory, getallMainCategory, getCategoryByMaincategory, updateCategory } = require("../../controllers/categoryController");
=======
const { getAllCategory, addCatergory, deleteCategory, getallMainCategory, getCategoryByMaincategory, fixmaincategory } = require("../../controllers/categoryController");
>>>>>>> 3f076c7d4cd2d0e12090d4569cbae6606e0c3b22
const router = express.Router();
// const authController = require("../controller/authController");

router.post("/addCategory", addCatergory);
<<<<<<< HEAD
router.get("/updateCateogry", updateCategory);
=======
>>>>>>> 3f076c7d4cd2d0e12090d4569cbae6606e0c3b22

router.get('/getAllCategory', getAllCategory)

router.get('/getCategory/:name', getAllCategory)
router.get('/getallmaincategory', getallMainCategory)
<<<<<<< HEAD
=======
router.get('/fixmaincategory', fixmaincategory)
>>>>>>> 3f076c7d4cd2d0e12090d4569cbae6606e0c3b22

router.get('/getCategoryByMainCategory/:mainCategoryId', getCategoryByMaincategory);

router.delete('/deleteCategory/:id', deleteCategory);
// router.put("/updateCategory", otpLogin);

// router.post("/login", authController.login);

module.exports = router;
