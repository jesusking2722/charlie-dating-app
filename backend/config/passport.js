const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/User");
require("dotenv").config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from header
  secretOrKey: process.env.JWT_SECRET, // Secret key used to sign the JWT
};

const strategy = new Strategy(opts, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id);
    if (user) {
      return done(null, user); // User found, attach user to request
    } else {
      return done(null, false); // No user found, authentication fails
    }
  } catch (err) {
    return done(err, false); // Server error
  }
});

module.exports = (passport) => {
  passport.use(strategy); // Use the strategy with Passport
};
