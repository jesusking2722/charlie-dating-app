const express = require("express");
const router = express.Router();
const { fetchUserInfo } = require("../controllers/userController");

router.get("/:id", fetchUserInfo);

module.exports = router;
