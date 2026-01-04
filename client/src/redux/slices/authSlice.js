import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!cookies.get("token"),
    role: cookies.get("role") || "guest",
    token: cookies.get("token") || null,
  },
  reducers: {
    login(state, action) {
      const { token, role } = action.payload;
      state.isAuthenticated = true;
      state.token = token;
      state.role = role;

      cookies.set("token", token, { path: "/", maxAge: 60 * 60 * 24 * 7 });
      cookies.set("role", role, { path: "/", maxAge: 60 * 60 * 24 * 7 });
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.role = "guest";

      cookies.remove("token", { path: "/" });
      cookies.remove("role", { path: "/" });
    },
    initializeAuth(state, action) {
      const { token, role } = action.payload;
      state.isAuthenticated = !!token;
      state.token = token || null;
      state.role = role || "guest";
    },
  },
});

export const { login, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
