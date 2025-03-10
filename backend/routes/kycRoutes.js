const express = require("express");
const router = express.Router();
const {
  startKycVerification,
  fetchSessionDecision,
} = require("../controllers/kycController");

router.get("/start", startKycVerification);
router.post("/session", fetchSessionDecision);

module.exports = router;
