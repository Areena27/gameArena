import { useTheme } from "@mui/material/styles";
import { Box, Typography, Container } from "@mui/material";

export function BlogPlaceholder() {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ padding: { xs: "24px", md: "48px" }, minHeight: "60vh" }}>
      <Box
        sx={{
          textAlign: "center",
          padding: { xs: "48px 24px", md: "80px 48px" },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            marginBottom: "24px",
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Blog
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: { xs: "1rem", md: "1.25rem" },
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Welcome to the CyberArena blog. Stay tuned for updates!
        </Typography>
      </Box>
    </Container>
  );
}
