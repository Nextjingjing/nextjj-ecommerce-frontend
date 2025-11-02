import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
  username: string | null;
  expiry: number | null;
}

const initialState: AuthState = {
  username: localStorage.getItem("username"),
  expiry: localStorage.getItem("username_expiry")
    ? parseInt(localStorage.getItem("username_expiry")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      const expiry = Date.now() + 24 * 60 * 60 * 1000 + 5000;
      state.username = action.payload;
      state.expiry = expiry;
      localStorage.setItem("username", action.payload);
      localStorage.setItem("username_expiry", expiry.toString());
    },
    logout: (state) => {
      state.username = null;
      state.expiry = null;
      localStorage.removeItem("username");
      localStorage.removeItem("username_expiry");
    },
    checkExpiry: (state) => {
      if (state.expiry && Date.now() > state.expiry) {
        state.username = null;
        state.expiry = null;
        localStorage.removeItem("username");
        localStorage.removeItem("username_expiry");
      }
    },
  },
});

export const { loginSuccess, logout, checkExpiry } = authSlice.actions;

export default authSlice.reducer;
