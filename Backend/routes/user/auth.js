const express = require("express");
const { verifyOtp, otpLogin } = require("../../controllers/authController");
const router = express.Router();
// const authController = require("../controller/authController");

router.post("/verifyOtp", verifyOtp);
router.post("/otpLogin", otpLogin);
// router.post("/login", authController.login);

module.exports = router;
