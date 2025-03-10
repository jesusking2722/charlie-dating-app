const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportConfig = require("./config/passport"); // Ensure this points to your passport config file
const authRoutes = require("./routes/authRoutes");
const kycRoutes = require("./routes/kycRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/api/auth", authRoutes);
app.use(
  "/api/kyc",
  passport.authenticate("jwt", { session: false }),
  kycRoutes
);
app.use(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  userRoutes
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
