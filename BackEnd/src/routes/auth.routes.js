import express from "express";
import {
  signup,
  login,
  logout,
  authCheck,
} from "../controllers/Auth.controllers.js";
import protectiveRoute from "../middlewares/protectRoute.middleware.js";
import { updateProfile } from "../middlewares/updateRoute.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/profile-update", protectiveRoute, updateProfile);
router.get("/check", protectiveRoute, authCheck);
export default router;
