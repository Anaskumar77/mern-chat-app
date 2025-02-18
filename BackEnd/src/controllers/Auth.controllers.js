import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  const user = await User.findOne(email);

  if (user) res.status(400).json({ message: "User already exists" });

  const salt = await bcryptjs.genSalt(10);

  const hashedPassword = await bcryptjs.hash(password, salt);

  const newUser = new User({
    fullname,
    email,
    password: hashedPassword,
  });
  if (newUser) {
    // jwt token creation
  } else {
    res.status(400).json({ message: "Error in creating user in DataBase" });
  }
};

export const login = (req, res) => {
  res.send("login");
};

export const logout = (req, res) => {
  res.send("logout");
};
