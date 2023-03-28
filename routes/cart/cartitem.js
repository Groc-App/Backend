import { Router } from "express";
import { addCartItem, updateQuantity, deleteCartItem, FetchallItemsbyUserId, deleteCartItembynumber } from "../../controllers/cartItemControllers.js";
const router = Router();

router.post("/addcartitem", addCartItem);
router.post("/updatequantity", updateQuantity);
router.delete("/deleteItem/:id", deleteCartItem);
router.post("/deleteCartItem", deleteCartItembynumber);
// router.get("/fetchitemsid/:id", FetchallItemsbyUserId);

export default router;
