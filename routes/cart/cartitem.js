const express = require("express");
const { addCartItem, updateQuantity, deleteCartItem, FetchallItemsbyUserId } = require("../../controllers/cartItemControllers");
const router = express.Router();

router.post("/addcartitem", addCartItem);
router.post("/updatequantity", updateQuantity);
router.delete("/deleteItem/:id", deleteCartItem);
// router.get("/fetchitemsid/:id", FetchallItemsbyUserId);

module.exports = router;
