import { Router } from "express";
import { addProduct, fetchProductbyCategory, fetchproductsbyMostSelling, fetchProductbyMainCategory, fetchProductbyId, updateProduct, deleteProduct, fetchProductByMainCategoryAndCategory, fetchAllProducts, updatemostsellingtag, fixmostsellinproducts } from "../../controllers/productController.js";
const router = Router();

router.post("/addproduct", addProduct);
router.post("/updateproduct", updateProduct);
router.post("/deleteproduct/:id", deleteProduct);
router.get("/fetchproductcategory/:category", fetchProductbyCategory);
router.get("/fetchproductmaincategory/:maincategory", fetchProductbyMainCategory);
router.get("/fetchProducts", fetchProductByMainCategoryAndCategory);
router.get("/fetchproductcid/:id", fetchProductbyId);
router.get("/fetchproductcmostselling", fetchproductsbyMostSelling);
router.get("/fetchAllProduct", fetchAllProducts);
router.get("/updatemostsellimgtag/:id", updatemostsellingtag);

router.get("/fixmostsellingproducts", fixmostsellinproducts);

export default router;
