import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function GamesPageHeader({ title, description }) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: "32px",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <Box>
        <Typography
          variant="h3"
          className="gaming-title"
          sx={{
            fontFamily: "'Jersey 10', sans-serif",
            fontWeight: 400,
            color: theme.palette.text.primary,
            marginBottom: "8px",
            textTransform: "uppercase",
            letterSpacing: "3px",
            fontSize: { xs: "1.75rem", md: "2.5rem" },
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "1rem",
          }}
        >
          {description}
        </Typography>
      </Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/")}
        sx={{
          color: theme.palette.secondary.main,
          border: `1px solid ${theme.palette.secondary.main}`,
          borderRadius: "4px",
          padding: "8px 16px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: theme.palette.mode === "dark"
              ? "rgba(56, 189, 248, 0.1)"
              : "rgba(56, 189, 248, 0.05)",
            borderColor: theme.palette.secondary.main,
          },
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
}

export function GamesGrid({ games }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(5, 1fr)",
        },
        gap: "24px",
      }}
    >
      {games.map((game, index) => (
        <Card
          key={index}
          sx={{
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.mode === "dark"
              ? "rgba(56, 189, 248, 0.25)"
              : "rgba(56, 189, 248, 0.2)"}`,
            borderRadius: "8px",
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: theme.palette.mode === "dark"
                ? "0 8px 16px rgba(56, 189, 248, 0.3)"
                : "0 8px 16px rgba(56, 189, 248, 0.2)",
            },
          }}
        >
          <CardMedia
            component="img"
            height="250"
            image={game.image || "/placeholder-game.png"}
            alt={game.name}
            sx={{
              objectFit: "cover",
              background: theme.palette.mode === "dark"
                ? "rgba(34, 48, 80, 0.5)"
                : "rgba(248, 250, 252, 0.5)",
            }}
          />
          <CardContent
            sx={{
              padding: "16px",
              background: theme.palette.background.paper,
            }}
          >
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                marginBottom: "8px",
                fontSize: "1rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {game.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "0.85rem",
              }}
            >
              Developed by: <span style={{ fontWeight: 500, color: theme.palette.secondary.main }}>{game.developer}</span>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export function GamesPageContainer({ children }) {
  return (
    <Box
      sx={{
        padding: { xs: "24px", md: "48px" },
        minHeight: "80vh",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {children}
    </Box>
  );
}

