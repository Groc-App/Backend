const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const { getAllCategory, addCatergory, deleteCategory } = require("../../controllers/categoryController");
const router = express.Router();
// const authController = require("../controller/authController");

router.post("/addCategory", addCatergory);

router.get('/getAllCategory', getAllCategory)

router.get('/getCategory/:name', getAllCategory)

router.delete('/deleteCategory/:id', deleteCategory);
// router.put("/updateCategory", otpLogin);

// router.post("/login", authController.login);

module.exports = router;
