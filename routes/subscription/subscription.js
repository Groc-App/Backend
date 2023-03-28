import { Router } from "express";
import { createSubscription, fetchSubscriptionByUser, cancelSubscriptionByUser, editSubscriptionByUser } from "../../controllers/subscription.js";
const router = Router();

router.post("/createSubscription", createSubscription);
router.get("/fetchSubscriptionByUser", fetchSubscriptionByUser);
router.post("/editSubscriptionByUser", editSubscriptionByUser);
router.delete("/cancelSubscriptionByUser", cancelSubscriptionByUser);

export default router;

