import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    sidebarOpen: false,
    isTheamChanged:false,
    isLoading:false,
    isOnline:false,
    isWsConnected:false
  },
  reducers: {
    setSidebarOpen(state, action) {
      state.sidebarOpen = action.payload;
    },
    setIsTheamChanged(state, action) {
      state.isTheamChanged = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setisOnline(state, action) {
      state.isOnline = action.payload;
    },
    setisWsConnected(state, action) {
      state.isWsConnected = action.payload;
    },
  },
});

export const configActions = configSlice.actions;

export default configSlice;