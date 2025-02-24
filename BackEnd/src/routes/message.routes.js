import express from "express";
import protectRoute from "../middlewares/protectRoute.middleware.js";
import {
  getUsersForSideBar,
  getMessages,
} from "../controllers/Message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSideBar);
router.get("/:id", protectRoute, getMessages);

export default router;
