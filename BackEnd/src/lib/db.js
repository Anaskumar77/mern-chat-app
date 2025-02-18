import mongoose from "mongoose";
import User from "../models/user.model.js";

const ConnectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connection successfull");
  } catch (err) {
    console.log(err);
  }
};

export default ConnectDB;
