const express = require("express");
const { addProduct, fetchProductbyCategory, fetchproductsbyMostSelling,fetchProductbyMainCategory, fetchProductbyId, updateProduct, deleteProduct } = require("../../controllers/productController");
const router = express.Router();

router.post("/addproduct", addProduct);
router.post("/updateproduct", updateProduct);
router.post("/deleteproduct/:id", deleteProduct);
router.get("/fetchproductcategory/:category", fetchProductbyCategory);
router.get("/fetchproductmaincategory/:maincategory", fetchProductbyMainCategory);
router.get("/fetchproductcid/:id", fetchProductbyId);
router.get("/fetchproductcmostselling", fetchproductsbyMostSelling);

module.exports = router;
