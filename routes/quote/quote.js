import { Router } from "express";
import { quoteController } from "../../controllers/qouteController.js";
const router = Router();

router.get("/getQuote", quoteController);

export default router;