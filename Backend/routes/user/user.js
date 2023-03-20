const express = require("express");
const { addAddress, getAddress } = require("../../controllers/addressController");
const { addUser, getUser, createuserifnotexist, updateCartItem, getAddresses, FetchallItemsbyUserId, createCartItem, getSelectedAddress, cryptic } = require("../../controllers/userController");
const router = express.Router();
// const authController = require("../controller/authController");

router.post("/addUser", addUser);

router.post("/createorupdatecartitem", updateCartItem);

router.post("/createcartitem", createCartItem);

router.get('/getUser', getUser);
// router.post("/cryptic", cryptic)

router.get('/createuserifnotexist/:number', createuserifnotexist);

router.post('/getaddresses', getAddresses);

router.get('/fetchAllItem/:id', FetchallItemsbyUserId);

router.get('/fetchselectedaddress/:id', getSelectedAddress);

module.exports = router;
