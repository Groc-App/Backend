const express = require("express");
const { addAddress, getAddress } = require("../../controllers/addressController");
const router = express.Router();
// const authController = require("../controller/authController");

router.post("/addAddress", addAddress);

router.get('/getAddress', getAddress)

module.exports = router;
