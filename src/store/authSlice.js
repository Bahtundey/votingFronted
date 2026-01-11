import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },

    setUser(state, action) {
      state.user = action.payload;
    },

    updateProfile(state, action) {
      if (!state.user) return;
      state.user = { ...state.user, ...action.payload };
    },

    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, setUser, updateProfile, logout } =
  authSlice.actions;

export default authSlice.reducer;
