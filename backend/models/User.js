const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, sparse: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    password: { type: String },
    profilePics: [{ type: String }],
    gender: { type: String, enum: ["male", "female"] },
    kyc: {
      sessionId: { type: String },
      sessionNumber: { type: Number },
      sessionToken: { type: String },
      vendorData: { type: String },
      status: {
        type: String,
        enum: [
          "Not Started",
          "In Progress",
          "Completed",
          "Approved",
          "Declined",
          "Expired",
          "Abandoned",
        ],
      },
      url: { type: String },
    },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
