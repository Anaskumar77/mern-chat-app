import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  console.log(req.body);
  const { fullname, email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcryptjs.genSalt(10);

  const hashedPassword = await bcryptjs.hash(password, salt);

  const newUser = new User({
    fullname,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    // jwt token creation
    generateToken(newUser._id, res);
    await newUser.save();
    res.status(200).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      // profilepic:newUser.profilepic
    });
  } else {
    res.status(400).json({ message: "Error in creating user in DataBase" });
  }
};

export const login = async (req, res) => {
  // res.send("login");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "email is invalid" });
    }
    const isPassword = await bcryptjs.compare(password, user.password);
    if (isPassword) {
      generateToken(user._id, res);
      res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilepic: user.profilepic,
      });
    } else {
      res.status(400).json({ message: "password is invalid" });
    }
  } catch (err) {
    res.status(500).json({
      message: "internal server error in user login",
    });
    console.log(err);
  }
};

export const logout = (req, res) => {
  res.send("logout");
};
