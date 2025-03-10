const User = require("../models/User");

const fetchMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "User not found" });
    }
    res.json({ data: user, success: true, message: "User found" });
  } catch (error) {
    console.log("fetch user error: ", error);
  }
};

module.exports = { fetchMe };
