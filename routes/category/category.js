const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const { getAllCategory, addCatergory, deleteCategory } = require("../../controllers/categoryController");
const router = express.Router();
// const authController = require("../controller/authController");

// /**
//  * @swagger
//  * /addCategory:
//  *   get:
//  *     summary: This adds cateogry
//  *     responses:
//  *       201:
//  *         description: Returs a json message and data
//  *         content:application/json
//  */

router.post("/addCategory", addCatergory);
router.get('/getAllCategory', getAllCategory)
router.get('/getCategory/:name', getAllCategory)
router.delete('/deleteCategory/:id', deleteCategory);
// router.put("/updateCategory", otpLogin);

// router.post("/login", authController.login);

module.exports = router;
