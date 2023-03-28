import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import { getAllCategory, addCatergory, deleteCategory, getallMainCategory, getCategoryByMaincategory, updateCategory, fixmaincategory } from "../../controllers/categoryController.js";
const router = Router();
// const authController = require("../controller/authController");

router.post("/addCategory", addCatergory);
router.get("/updateCateogry", updateCategory);

router.get('/getAllCategory', getAllCategory)

router.get('/getCategory/:name', getAllCategory)
router.get('/getallmaincategory', getallMainCategory)
router.get('/fixmaincategory', fixmaincategory)

router.get('/getCategoryByMainCategory/:mainCategoryId', getCategoryByMaincategory);

router.delete('/deleteCategory/:id', deleteCategory);
// router.put("/updateCategory", otpLogin);

// router.post("/login", authController.login);

export default router;
