import User from "../models/user.model.js";
import Messages from "../models/message.model.js";
export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    console.log(currentUserId);
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    if (!otherUsers) {
      res.status(500).json({
        messages:
          "Internal server error, we can't find the side bar users. sorry  :( ",
      });
    }
    res.send(200).json(otherUsers);
  } catch {
    res.status(500).json({ message: "getUsersForSideBar" });
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
