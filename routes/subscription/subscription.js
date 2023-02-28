const express = require("express");
const { createSubscription, fetchSubscriptionByUser } = require("../../controllers/subscription");
const router = express.Router();

router.post("/createSubscription", createSubscription);
router.get("/fetchSubscriptionByUser", fetchSubscriptionByUser);

module.exports = router;

