// import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../lib/utils.js";
// import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "field is empty" });
  }
  const user = await User.findOne({ email: email });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcryptjs.genSalt(10);

  const hashedPassword = await bcryptjs.hash(password, salt);

  const newUser = new User({
    fullname,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    console.log("New User Id:", newUser._id.toString());
    generateToken(newUser._id.toString(), res);
    await newUser.save();
    return res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
    });
  } else {
    return res
      .status(400)
      .json({ message: "Error in creating user in DataBase" });
  }
};

export const login = async (req, res) => {
  // res.send("login");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "email is invalid" });
    }
    const isPassword = await bcryptjs.compare(password, user.password);
    if (isPassword) {
      const generatedToken = generateToken(user._id, res);
      res.cookie("jwt", generatedToken, {
        httpOnly: true,
        secure: false || process.env.NODE_ENV !== "development",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilepic: user.profilepic,
      });
    } else {
      return res.status(400).json({ message: "password is invalid" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "internal server error in user login",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "cookie got deleted" });
  } catch {
    return res.send("logout failed");
  }
};

export const authCheck = (req, res) => {
  console.log(" auth checking");
  try {
    // console.log(req.user);
    res.status(200).json(req.user);
  } catch (err) {
    console.log("auth check Error");
    //  console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
