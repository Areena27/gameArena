import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "dark", // SAFE DEFAULT FOR SSR
    hydrated: false,
  },
  reducers: {
    setTheme(state, action) {
      state.mode = action.payload;
      state.hydrated = true;
      cookies.set("theme", state.mode, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    },
    toggleTheme(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
      cookies.set("theme", state.mode, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
