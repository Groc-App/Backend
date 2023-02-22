const express = require("express");
const { fetchallOrdersbyUserId, createOrder } = require("../../controllers/orderController");
const router = express.Router();

router.post("/createorder", createOrder);
router.get("/fetchordersid/:userid", fetchallOrdersbyUserId);

module.exports = router;
