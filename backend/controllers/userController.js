const User = require("../models/User");

const fetchUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }
    res.json({ data: user, success: true, message: "User found" });
  } catch (error) {
    console.log("fetch user error: ", error);
  }
};

module.exports = { fetchUserInfo };
