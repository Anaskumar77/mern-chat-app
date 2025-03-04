import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
export const updateProfile = async (req, res) => {
  console.log("hello");
  // userId = req.user;
  try {
    const { profilePic } = req.body;
    const userId = req.user._id.toString();

    if (!profilePic) {
      res.status(400).json({ message: "please provide a profile pic" });
    }
    try {
      const response = await cloudinary.uploader.upload(profilePic);
      console.log(response.secure_url);
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        { profilepic: response.secure_url },
        { new: true }
      );
      // const hello = await User.findOne({ _id: userId });
      console.log(updatedUser);
      console.log("hello");
      return res.status(200).json(updatedUser);
    } catch (e) {
      console.log(e.message);
    }
  } catch (err) {
    console.log(err);
  }
};
