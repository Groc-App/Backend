const express = require("express");
const { addProduct, fetchProductbyCategory, fetchProductbyId, updateProduct, deleteProduct } = require("../../controllers/productController");
const router = express.Router();
// const authController = require("../controller/authController");

router.post("/addproduct", addProduct);
router.post("/updateproduct", updateProduct);
router.post("/deleteproduct/:id", deleteProduct);
router.get("/fetchproductcategory", fetchProductbyCategory);
router.get("/fetchproductcid/:id", fetchProductbyId);

// router.post("/login", authController.login);

module.exports = router;
