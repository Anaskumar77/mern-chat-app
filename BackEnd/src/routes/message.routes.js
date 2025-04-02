import express from "express";
import protectRoute from "../middlewares/protectRoute.middleware.js";
import {
  getUsersForSideBar,
  getMessages,
  sendMessages,
} from "../controllers/Message.controller.js";

const router = express.Router();

router.get("/user", protectRoute, getUsersForSideBar);
router.get("/:id", protectRoute, getMessages);
router.get("/send/:id", protectRoute, sendMessages);

export default router;
