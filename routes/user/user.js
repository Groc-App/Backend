const express = require("express");
const { addAddress, getAddress } = require("../../controllers/addressController");
const { addUser, getUser, createuserifnotexist, createCartItem } = require("../../controllers/userController");
const router = express.Router();
// const authController = require("../controller/authController");

router.post("/addUser", addUser);

router.post("/createorupdatecartitem", createCartItem);

router.get('/getUser', getUser);

router.get('/createuserifnotexist/:number', createuserifnotexist);

module.exports = router;
