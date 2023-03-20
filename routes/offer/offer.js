const express = require("express");
<<<<<<< HEAD
const { postOffers, getAllOffers, updateOffer, redeemOffer } = require("../../controllers/offerController");
=======
const { postOffers, getAllOffers, updateOffer } = require("../../controllers/offerController");
>>>>>>> 3f076c7d4cd2d0e12090d4569cbae6606e0c3b22
const router = express.Router();
// const authController = require("../controller/authController");

router.get("/getAllOffers", getAllOffers);

<<<<<<< HEAD
router.post('/redeemOffer', redeemOffer)

=======
>>>>>>> 3f076c7d4cd2d0e12090d4569cbae6606e0c3b22
router.post("/postOffer", postOffers);

router.patch("/updateOffer", updateOffer);

module.exports = router;
