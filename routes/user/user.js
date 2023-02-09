const express = require("express");
const { addAddress, getAddress } = require("../../controllers/addressController");
const { addUser, getUser } = require("../../controllers/userController");
const router = express.Router();
// const authController = require("../controller/authController");

router.post("/addUser", addUser);

router.get('/getUser', getUser)

module.exports = router;
