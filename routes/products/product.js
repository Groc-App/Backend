const express = require("express");
const { addProduct, fetchProductbyCategory, fetchProductbyId } = require("../../controllers/productController");
const router = express.Router();
// const authController = require("../controller/authController");

router.post("/addproduct", addProduct);
router.post("/fetchproductcategory", fetchProductbyCategory);
router.post("/fetchproductcid", fetchProductbyId);

// router.post("/login", authController.login);

module.exports = router;
