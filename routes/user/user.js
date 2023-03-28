import { Router } from "express";
import { addUser, getUser, createuserifnotexist, updateCartItem, getAddresses, FetchallItemsbyUserId, createCartItem, getSelectedAddress } from "../../controllers/userController.js";
const router = Router();
// const authController = require("../controller/authController");

router.post("/addUser", addUser);

router.post("/createorupdatecartitem", updateCartItem);

router.post("/createcartitem", createCartItem);

router.get('/getUser', getUser);
// router.post("/cryptic", cryptic)

router.post('/createuserifnotexist', createuserifnotexist);

router.post('/getaddresses', getAddresses);

router.get('/fetchAllItem/:id', FetchallItemsbyUserId);

router.get('/fetchselectedaddress/:id', getSelectedAddress);

export default router;
