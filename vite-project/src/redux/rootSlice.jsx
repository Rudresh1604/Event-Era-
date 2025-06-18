import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: null,
    notification: [],
    selectedChat: null,
    chats: [],
    selectedClub: null,
    selectedEvent: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    showLoading: (state, action) => {
      state.loading = true;
    },
    hideLoading: (state, action) => {
      state.loading = false;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setNotifications: (state, action) => {
      state.notification = action.payload;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    setSelectedClub: (state, action) => {
      state.selectedClub = action.payload;
    },
  },
});

export default rootSlice.reducer;
export const {
  showLoading,
  hideLoading,
  setUser,
  setNotifications,
  setChats,
  setSelectedChat,
  setSelectedClub,
  setSelectedEvent,
} = rootSlice.actions;
