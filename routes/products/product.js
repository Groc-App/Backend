const express = require("express");
<<<<<<< HEAD
const { addProduct, fetchProductbyCategory, fetchproductsbyMostSelling, fetchProductbyMainCategory, fetchProductbyId, updateProduct, deleteProduct, fetchProductByMainCategoryAndCategory, fetchAllProducts, updatemostsellingtag } = require("../../controllers/productController");
=======
const { addProduct, fetchProductbyCategory, fetchproductsbyMostSelling, fetchProductbyMainCategory, fetchProductbyId, updateProduct, deleteProduct, fetchProductByMainCategoryAndCategory, fetchAllProducts, fixmostsellinproducts } = require("../../controllers/productController");
>>>>>>> 3f076c7d4cd2d0e12090d4569cbae6606e0c3b22
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
<<<<<<< HEAD
router.get("/updatemostsellimgtag/:id", updatemostsellingtag);

=======
router.get("/fixmostsellingproducts", fixmostsellinproducts);
>>>>>>> 3f076c7d4cd2d0e12090d4569cbae6606e0c3b22

module.exports = router;
