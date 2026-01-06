import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppBar, Toolbar, Typography, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Cookies } from "react-cookie";

import { toggleTheme } from "@/redux/slices/themeSlice";
import { logout } from "@/redux/slices/authSlice";
import { authAPI } from "@/services/api";
import { Button } from "@/components/common/ui/uiComponents";

const cookies = new Cookies();

const LINKS = [
  { label: "Games", href: "/user/home" },
  { label: "Upgrade", href: "/user/upgrade" },
  { label: "Profile", href: "/user/profile" },
];

export default function UserNavbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const muiTheme = useTheme();
  const themeMode = useSelector((state) => state.theme.mode);
  const [mounted, setMounted] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } finally {
      cookies.remove("token", { path: "/" });
      cookies.remove("role", { path: "/" });
      dispatch(logout());
      router.push("/");
    }
  };

  const isDark = muiTheme.palette.mode === "dark";
  const baseStyle = {
    color: muiTheme.palette.text.primary,
    fontSize: "14px",
    fontWeight: 500,
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": { color: muiTheme.palette.secondary.main },
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: isDark ? "rgba(4, 10, 36, 0.85)" : "rgba(248, 250, 252, 0.95)",
        borderBottom: `1px solid ${isDark ? "rgba(56,189,248,0.2)" : "rgba(56,189,248,0.3)"}`,
        backdropFilter: "blur(10px)",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap", gap: "12px", py: 1 }}>
        <Typography
          variant="h6"
          component="h2"
          onClick={() => router.push("/user/home")}
          sx={{
            color: muiTheme.palette.secondary.main,
            fontWeight: 600,
            cursor: "pointer",
            "&:hover": { textShadow: "0 0 10px rgba(56, 189, 248, 0.8)" },
          }}
        >
          CyberArena
        </Typography>

        <Box display="flex" gap="16px" alignItems="center" flexWrap="wrap">
          {LINKS.map(({ label, href }) => (
            <Typography
              key={label}
              component="a"
              onClick={(e) => {
                e.preventDefault();
                router.push(href);
              }}
              sx={{
                ...baseStyle,
                color: router.pathname === href ? muiTheme.palette.secondary.main : baseStyle.color,
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>

        <Box display="flex" gap="12px" alignItems="center" flexWrap="wrap">
          {mounted && (
            <IconButton
              onClick={() => {
                const newTheme = themeMode === "dark" ? "light" : "dark";
                cookies.set("theme", newTheme, { path: "/", maxAge: 60 * 60 * 24 * 365 });
                dispatch(toggleTheme());
              }}
              aria-label="Toggle theme"
              sx={{
                color: muiTheme.palette.text.primary,
                "&:hover": {
                  transform: "scale(1.15)",
                  filter: "drop-shadow(0 0 6px rgba(168, 85, 247, 0.8))",
                },
              }}
            >
              {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          )}
          <IconButton
            onClick={() => router.push("/user/profile")}
            aria-label="Profile"
            sx={{
              color: muiTheme.palette.text.primary,
              "&:hover": { color: muiTheme.palette.secondary.main },
            }}
          >
            <PersonIcon />
          </IconButton>
          <IconButton
            onClick={() => setLogoutDialogOpen(true)}
            aria-label="Logout"
            sx={{
              color: muiTheme.palette.text.primary,
              "&:hover": { color: "error.main" },
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Box>

        <Dialog
          open={logoutDialogOpen}
          onClose={() => setLogoutDialogOpen(false)}
          PaperProps={{
            sx: {
              background: muiTheme.palette.background.paper,
              color: muiTheme.palette.text.primary,
              border: `1px solid ${isDark ? "rgba(56,189,248,0.25)" : "rgba(56,189,248,0.2)"}`,
            },
          }}
        >
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: muiTheme.palette.text.secondary }}>
              Are you sure you want to quit?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              label="Cancel"
              variant="secondary"
              onClick={() => setLogoutDialogOpen(false)}
            />
            <Button
              label="Yes"
              onClick={() => {
                setLogoutDialogOpen(false);
                handleLogout();
              }}
            />
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
}

