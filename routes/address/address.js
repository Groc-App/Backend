import { Router } from "express";
import { addAddress, deleteAddress, setSelectedAddress, updateAddress } from "../../controllers/addressController.js";
const router = Router();
// const authController = require("../controller/authController");

router.post("/addAddress", addAddress);
router.post("/deleteAddress", deleteAddress);
router.post("/setSelectedAddress", setSelectedAddress);
router.post("/updateAddress", updateAddress);

// router.get('/getAddress', getAddress)

export default router;
