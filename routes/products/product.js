const express = require("express");
const { addProduct, fetchProductbyCategory, fetchproductsbyMostSelling, fetchProductbyMainCategory, fetchProductbyId, updateProduct, deleteProduct, fetchProductByMainCategoryAndCategory, fetchAllProducts, fixmostsellinproducts } = require("../../controllers/productController");
const router = express.Router();

router.post("/addproduct", addProduct);
router.post("/updateproduct", updateProduct);
router.post("/deleteproduct/:id", deleteProduct);
router.get("/fetchproductcategory/:category", fetchProductbyCategory);
router.get("/fetchproductmaincategory/:maincategory", fetchProductbyMainCategory);
router.get("/fetchProducts", fetchProductByMainCategoryAndCategory);
router.get("/fetchproductcid/:id", fetchProductbyId);
router.get("/fetchproductcmostselling", fetchproductsbyMostSelling);
router.get("/fetchAllProduct", fetchAllProducts);
router.get("/fixmostsellingproducts", fixmostsellinproducts);

module.exports = router;
