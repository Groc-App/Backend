const express = require("express");
const { postOffers, getAllOffers, updateOffer, redeemOffer } = require("../../controllers/offerController");
const router = express.Router();
// const authController = require("../controller/authController");

router.get("/getAllOffers", getAllOffers);

router.post('/redeemOffer', redeemOffer);

router.post("/postOffer", postOffers);

router.patch("/updateOffer", updateOffer);

module.exports = router;
