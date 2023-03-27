const express = require("express");
const { addAddress, deleteAddress, setSelectedAddress, updateAddress } = require("../../controllers/addressController");
const router = express.Router();
// const authController = require("../controller/authController");

router.post("/addAddress", addAddress);
router.post("/deleteAddress", deleteAddress);
router.post("/setSelectedAddress", setSelectedAddress);
router.post("/updateAddress", updateAddress);

// router.get('/getAddress', getAddress)

module.exports = router;
