const express = require("express");
const { addProduct, fetchProductbyCategory, fetchProductbyId, updateProduct, deleteProduct } = require("../../controllers/productController");
const router = express.Router();

router.post("/addproduct", addProduct);
router.post("/updateproduct", updateProduct);
router.post("/deleteproduct/:id", deleteProduct);
router.get("/fetchproductcategory/:category", fetchProductbyCategory);
router.get("/fetchproductcid/:id", fetchProductbyId);

module.exports = router;
