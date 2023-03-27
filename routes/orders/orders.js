const express = require("express");
const { fetchallOrdersbyUserId, createOrder, fetchallAllOrdersbyStatus, updateorderstatus } = require("../../controllers/orderController");
const router = express.Router();

router.post("/createorder", createOrder);
router.get("/fetchordersid/:userid", fetchallOrdersbyUserId);
router.get("/fetchallpendingorders/:status", fetchallAllOrdersbyStatus);
router.post("/updateorderstatus", updateorderstatus);

module.exports = router;
