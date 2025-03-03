import cloudinary from "../lib/cloudinary.js";

export const updateProfile = async (req, res) => {
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
      const hello = await User.findOne({ _id: userId });
      console.log(hello);
      console.log("hello");
      // res.status(400).json({ message: " mmm" });
    } catch (e) {
      console.log(e.message);
    }
  } catch (err) {
    console.log(err);
  }
};
