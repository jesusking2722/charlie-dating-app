const express = require("express");
const router = express.Router();
const { fetchMe } = require("../controllers/userController");

router.get("/me", fetchMe);

module.exports = router;
