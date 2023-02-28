const express = require("express");
const { postOffers, getAllOffers, updateOffer } = require("../../controllers/offerController");
const router = express.Router();
// const authController = require("../controller/authController");

router.get("/getAllOffers", getAllOffers);

router.post("/postOffer", postOffers);

router.patch("/updateOffer", updateOffer);

module.exports = router;
