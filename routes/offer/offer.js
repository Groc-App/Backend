const express = require("express");
const { postOffers, getAllOffers, updateOffer, redeemOffer, referralId } = require("../../controllers/offerController");
const { verifyReferral } = require("../../controllers/orderController");
const router = express.Router();
// const authController = require("../controller/authController");

router.get("/getAllOffers", getAllOffers);

router.post('/redeemOffer', redeemOffer);

router.post('/verifyReferral', verifyReferral)

router.get('/getReferralId/:number', referralId)

router.post("/postOffer", postOffers);

router.patch("/updateOffer", updateOffer);

module.exports = router;
