import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      console.log("no token");
      return res.status(401).json({ message: "Unauthorized - No token" });
    } else {
      const userId = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(userId);
      if (!userId) {
        return res.status(400).json({ message: "Invalid user info's" });
      }
      try {
        const user = await User.findOne({ _id: userId.id }).select("-password");
        req.user = user; /////// // / / / / / /

        return res.status(200).json(user);
        next();
      } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "internal server Error" });
      }
    }
  } catch (err) {
    // console.log("heloooooooooooooo");
    console.log(err.message);
    return res.status(500).json({ message: "internal error" });
  }
};

export default protectRoute;
