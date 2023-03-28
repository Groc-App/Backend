import { Router } from "express";
import { postOffers, getAllOffers, updateOffer, redeemOffer, referralId } from "../../controllers/offerController.js";
import { verifyReferral } from "../../controllers/orderController.js";
const router = Router();
// const authController = require("../controller/authController");

router.post("/getAllOffers", getAllOffers);

router.post('/redeemOffer', redeemOffer);

router.post('/verifyReferral', verifyReferral)

router.get('/getReferralId/:number', referralId)

router.post("/postOffer", postOffers);

router.patch("/updateOffer", updateOffer);

export default router;
