import cloudinary from "../lib/cloudinary.js";

export const updateProfile = async (req, res) => {
  // userId = req.user;
  try {
    const { profilePic } = req.body;
    const userId = req.user._id.toString();

    if (!profilePic) {
      res.status(400).json({ message: "please provide a profile pic" });
    }
    const response = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { profilepic: response.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};
