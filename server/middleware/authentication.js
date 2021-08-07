const mongoose = require("mongoose");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const { sessionid } = req.headers;
  console.log("### sessionid ; ", sessionid);
  if (!sessionid || !mongoose.isValidObjectId(sessionid)) return next()
  const user = await User.findOne({ "sessions._id": sessionid });
  console.log("### user ; ", user);
  if (!user) return next();
  req.user = user;
  console.log("### req.use ; ", req.user);
  return next();
};

module.exports = { authenticate }