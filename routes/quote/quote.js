const express = require("express");
const { quoteController } = require("../../controllers/qouteController");
const router = express.Router();

router.get("/getQuote", quoteController);

module.exports = router;