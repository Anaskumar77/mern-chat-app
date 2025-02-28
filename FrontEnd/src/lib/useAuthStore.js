import { create } from "zustand";
import axiosInstance from "./axios.js";
import toast from "react-hot-toast";
import axios from "axios";

// import { getBottomNavigationActionUtilityClass } from "@mui/material";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  checkingAuth: true,

  authCheck: async () => {
    try {
      const res = axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch {
      set({ authUser: null });
    } finally {
      set({ checkingAuth: false });
    }
  },
  signup: async (signUpData) => {
    set({ isSigningUp: true });
    try {
      console.log("axios started");
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        signUpData
      );
      console.log(res);
      // const res = await axiosInstance.post("/auth/signup", signUpData);

      console.log("hello");
      if (res) {
        console.log(res);
        set({ authUser: res.user });
        toast.success("Account created successfully");
        set({ isSigningUp: false });
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Account creation failed");
    }
  },
  logout: async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout");
      set({ authUser: null });
      console.log("logout success");
    } catch {
      console.log("logout failed");
    }
  },
}));
