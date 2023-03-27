const express = require("express");
const { createSubscription, fetchSubscriptionByUser, cancelSubscriptionByUser, editSubscriptionByUser } = require("../../controllers/subscription");
const router = express.Router();

router.post("/createSubscription", createSubscription);
router.get("/fetchSubscriptionByUser", fetchSubscriptionByUser);
router.post("/editSubscriptionByUser", editSubscriptionByUser);
router.delete("/cancelSubscriptionByUser", cancelSubscriptionByUser);

module.exports = router;

