const express = require("express");
const { addProduct, fetchProductbyCategory, fetchProductbyMainCategory, fetchProductbyId, updateProduct, deleteProduct, fetchProductByMainCategoryAndCategory } = require("../../controllers/productController");
const router = express.Router();

router.post("/addproduct", addProduct);
router.post("/updateproduct", updateProduct);
router.post("/deleteproduct/:id", deleteProduct);
router.get("/fetchproductcategory/:category", fetchProductbyCategory);
router.get("/fetchproductmaincategory/:maincategory", fetchProductbyCategory);
router.get('/fetchProduct/:maincategory/:subcategory', fetchProductByMainCategoryAndCategory);
router.get("/fetchproductcid/:id", fetchProductbyId);

module.exports = router;
