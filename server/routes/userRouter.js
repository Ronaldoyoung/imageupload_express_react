const { Router } = require("express");
const userRouter = Router();
const User = require("../models/User");
const { hash, compare } = require("bcryptjs");

userRouter.post("/register", async (req, res) => {
  try {
    if (req.body.password.length < 6) throw new Error("low password");
    if (req.body.username.length < 3) throw new Error("username low < 3");
    const hashedPassword = await hash(req.body.password, 10);
    await new User({
      name: req.body.name,
      username: req.body.username,
      hashedPassword,
    }).save();
    res.json({ message: "user registered" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const isValid = await compare(req.body.password, user.hashedPassword);
    if (!isValid) throw new Error("not correct information you did");
    res.json({ message: "user logged" });

  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = { userRouter };