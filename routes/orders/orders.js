import { Router } from "express";
import { fetchallOrdersbyUserId, createOrder, fetchallAllOrdersbyStatus, updateorderstatus } from "../../controllers/orderController.js";
const router = Router();

router.post("/createorder", createOrder);
router.get("/fetchordersid/:userid", fetchallOrdersbyUserId);
router.get("/fetchallpendingorders/:status", fetchallAllOrdersbyStatus);
router.post("/updateorderstatus", updateorderstatus);

export default router;
