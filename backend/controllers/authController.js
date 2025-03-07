const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

const emailRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = await User.create({ email, password: hashedPassword });
    const token = generateToken(user._id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const emailLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Invalid credential" });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      data: { user, token },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { id, email, name } = req.body;

    let user = await User.findOne({ googleId: id });

    if (!user) {
      user = await User.create({
        googleId: id,
        email,
        name,
      });
    }

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { emailRegister, emailLogin, googleAuth };
