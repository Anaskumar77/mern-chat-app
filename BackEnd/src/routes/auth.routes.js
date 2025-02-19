import express from "express";
import { signup, login, logout } from "../controllers/Auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile-update", protectiveRoute, updateProfile);

export default router;
