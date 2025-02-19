import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export default protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "Unauthorized - No token" });
    }
    const userId = jwt.verify(token, process.env.JWT_SECRET);

    const user = User.findOne({ _id: userId }).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.json({ message: "cookie is invalid" });
  }
  next();
};
