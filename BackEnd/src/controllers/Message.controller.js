import User from "../models/user.model.js";
import Messages from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const otherUsers = await User.find({
      _id: { $ne: loggedInUserId.toString() },
    }).select("-password");
    console.log("   users   :", otherUsers);
    return res.status(200).json(otherUsers);
  } catch {
    return res.status(500).json({ message: "getUsersForSideBar failed" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const fetchedMessages = await Messages.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
    if (!fetchedMessages) {
      res.status(500).json({ message: "message fetch failed" });
    }
  } catch (err) {
    console.log("fetching failed");
    res.status(500).json({ message: "fetch get message failed" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { text, image } = req.body;

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Messages({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};
