const express = require("express");
const {
  emailRegister,
  emailLogin,
  googleAuth,
  fetchMe,
  updateMe,
} = require("../controllers/authController");

const router = express.Router();

// Google Sign-up
router.post("/register/google", googleAuth);
// Email Sign-up
router.post("/register/email", emailRegister);
// Google Sign-in
router.post("/login/google", googleAuth);
// Email Sign-in
router.post("/login/email", emailLogin);
// Fetch me
router.get("/me/:id", fetchMe);
// Update me
router.patch("/me", updateMe);

module.exports = router;
