import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { Cookies } from "react-cookie";

import { lightTheme, darkTheme } from "@/styles/mui/theme";
import { setTheme } from "@/redux/slices/themeSlice";
import UserNavbar from "@/components/user/UserNavbar";

const cookies = new Cookies();

export default function UserLayout({ children }) {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const theme = cookies.get("theme") || "dark";
    dispatch(setTheme(theme));
  }, [dispatch]);

  const theme = (mode || "dark") === "dark" ? darkTheme : lightTheme;

  if (!mounted) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ minHeight: "100vh", background: darkTheme.palette.background.default }} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserNavbar />
      <Box
        component="main"
        sx={{
          width: "100%",
          minHeight: "100vh",
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
}

