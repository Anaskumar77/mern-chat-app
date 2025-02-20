import express from "express";
import { signup, login, logout } from "../controllers/Auth.controllers.js";
import protectiveRoute from "../middlewares/protectRoute.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile-update", protectiveRoute);

export default router;
