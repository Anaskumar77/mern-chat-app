import { create } from "zustand";
import axiosInstance from "./axios.js";

const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    try {
      set({ isUsersLoading: true });
      const res = await axiosInstance.get(
        "http://localhost:3000/api/message/user"
      );
      set({ users: res.data });
    } catch (err) {
      console.log("error in getting users ");

      console.log(err);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    try {
      set({ isMessagesLoading: true });
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (err) {
      console.log("error in getting messages");

      console.log(err);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  // optimise user
  setSelectedUser: (selectedUser) => {
    set({ selectedUser: selectedUser });
  },
}));

export default useChatStore;
