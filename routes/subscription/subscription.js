const express = require("express");
const { createSubscription, fetchSubscriptionByUser, cancelSubscriptionByUser } = require("../../controllers/subscription");
const router = express.Router();

router.post("/createSubscription", createSubscription);
router.get("/fetchSubscriptionByUser", fetchSubscriptionByUser);
router.get("/editSubscriptionByUser", fetchSubscriptionByUser);
router.delete("/cancelSubscriptionByUser", cancelSubscriptionByUser);

module.exports = router;

