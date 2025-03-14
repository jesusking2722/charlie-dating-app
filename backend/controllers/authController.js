const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const mongoose = require("mongoose");

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
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.json({
      message: "Login successful",
      data: { user, token: `Bearer ${token}` },
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

const fetchMe = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("my id: ", userId);
    const me = await User.findById(userId);
    if (!me) {
      return res.json({ message: "User not found" });
    }
    res.json({ data: me, message: "User found", success: true });
  } catch (error) {
    console.log("fetch me error: ", error);
  }
};

const updateMe = async (req, res) => {
  try {
    const data = req.body;
    const me = await User.findById(data._id);
    if (!me) {
      return res.json({ message: "User not found" });
    }
    Object.assign(me, data);
    await me.save();
    console.log(me);
    res.json({ data: me, message: "Updated", success: true });
  } catch (error) {
    console.log("update me error: ", error);
  }
};

module.exports = { emailRegister, emailLogin, googleAuth, fetchMe, updateMe };
