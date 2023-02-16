const express = require("express");
const { addCartItem, updateQuantity, deleteCartItem, FetchallItemsbyUserId, deleteCartItembynumber } = require("../../controllers/cartItemControllers");
const router = express.Router();

router.post("/addcartitem", addCartItem);
router.post("/updatequantity", updateQuantity);
router.delete("/deleteItem/:id", deleteCartItem);
router.post("/deleteCartItem", deleteCartItembynumber);
// router.get("/fetchitemsid/:id", FetchallItemsbyUserId);

module.exports = router;
