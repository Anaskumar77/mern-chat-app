import { create } from "zustand";
import axiosInstance from "./axios.js";
import toast from "react-hot-toast";
import axios from "axios";

// import { getBottomNavigationActionUtilityClass } from "@mui/material";

const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  checkingAuth: true,

  authCheck: async () => {
    try {
      console.log("authCheck started");
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      console.log("authCheck response", res.data);
      console.log(res.data ? "verified" : "not verified");
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
        set({ authUser: res.data });
        toast.success("Account created successfully");
        set({ isSigningUp: false });
      }
    } catch (err) {
      console.log(
        err.message,
        "Account creation failed , useAuthStore => signup"
      );
      toast.error("Account creation failed , useAuthStore => signup");
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout");
      set({ authUser: null });
      console.log("logout success");
    } catch {
      console.log("logout failed , useAuthStore => logout");
    }
  },
  login: async (loginData) => {
    try {
      console.log("login started");
      set({ isLoggingIn: true });
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        loginData
      );
      set({ authUser: res.data });
      console.log("login successfull");
    } catch {
      console.log("login failed : useAuthStore => login");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axios.put(
        "http://localhost:3000/api/auth/profile-update",
        data
      );
      console.log(res.data);
    } catch {
      console.log("profile updating updating failed");
    } finally {
      set({ isUpdatingProfile: false });
      console.log("finally block");
    }
  },
}));

export default useAuthStore;
