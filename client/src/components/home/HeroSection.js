import { useTheme } from "@mui/material/styles";
import { Box, Typography, Container } from "@mui/material";

export default function HeroSection({ subtitle = "Join a growing community and explore something unique" }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isDark
          ? "linear-gradient(135deg, rgba(2, 6, 23, 0.85) 0%, rgba(34, 48, 80, 0.55) 100%)"
          : "linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
        borderBottom: `1px solid ${isDark ? "rgba(56, 189, 248, 0.2)" : "rgba(56, 189, 248, 0.1)"}`,
        padding: { xs: "60px 24px", md: "100px 48px" },
        marginBottom: "64px",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
          <Typography
            variant="h1"
            className="hero-title"
            sx={{
              fontFamily: "'Jersey 10', sans-serif",
              fontWeight: 400,
              fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
              marginBottom: "24px",
              textTransform: "uppercase",
              letterSpacing: "3px",
              background: isDark
                ? "linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)"
                : "linear-gradient(135deg, #a855f7 0%, #38bdf8 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: isDark ? "0 0 30px rgba(56, 189, 248, 0.3)" : "none",
            }}
          >
            DISCOVER & PLAY INDIE GAMES INSTANTLY
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: { xs: "1rem", md: "1.25rem" },
              fontWeight: 500,
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

