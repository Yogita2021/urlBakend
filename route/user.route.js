const express = require("express");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRoute = express.Router();
require("dotenv").config();
// user register route

userRoute.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(201)
        .json({ msg: "User already exists", isError: true });
    }

    let hash = bcrypt.hashSync(password, 5);

    let newuser = new UserModel({ name, email, password: hash });

    await newuser.save();

    res.status(200).json({ msg: "User registed Successfuly", isError: false });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// user Login route

userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(201)
        .json({ msg: "Please Register First", isError: true });
    }

    let passcheck = bcrypt.compareSync(password, user.password);

    if (!passcheck) {
      return res.status(201).json({ msg: "Wrong credentials", isError: true });
    }
    let payload = { userId: user._id, email: user.email };
    let token = jwt.sign(payload, process.env.secreteKey, { expiresIn: "8h" });

    res.status(200).json({
      msg: "User Logged in successful",
      isError: false,
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = { userRoute };
