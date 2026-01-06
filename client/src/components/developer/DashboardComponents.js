import { useTheme } from "@mui/material/styles";
import { Typography, Grid, Box, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from "@mui/material";
import { Card } from "@/components/common/ui/uiComponents";

export function DashboardTitle({ children }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Typography
      variant="h4"
      className="gaming-title"
      sx={{
        fontFamily: "'Jersey 10', sans-serif",
        fontWeight: 400,
        textTransform: "uppercase",
        letterSpacing: "2px",
        mb: { xs: 3, md: 5 },
        color: isDark ? "#e2e8f0" : theme.palette.text.primary,
      }}
    >
      {children}
    </Typography>
  );
}

export function DashboardStats({ stats }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Grid container spacing={3} sx={{ mb: { xs: 3, md: 4 } }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card>
            <Box sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography
                variant="body2"
                sx={{
                  color: isDark ? "#cbd5e1" : theme.palette.text.secondary,
                  mb: 1.5,
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "'Jersey 10', sans-serif",
                  fontWeight: 400,
                  color: theme.palette.secondary.main,
                }}
              >
                {stat.value}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export function DashboardTable({ games }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const cellStyles = {
    fontWeight: 600,
    color: isDark ? "#e2e8f0" : theme.palette.text.primary,
    fontSize: { xs: "0.875rem", md: "1rem" },
    py: { xs: 1.5, md: 2 },
  };

  const bodyCellStyles = {
    color: isDark ? "#e2e8f0" : theme.palette.text.primary,
    fontSize: { xs: "0.875rem", md: "1rem" },
    py: { xs: 1.5, md: 2 },
  };

  const secondaryCellStyles = {
    color: isDark ? "#cbd5e1" : theme.palette.text.secondary,
    fontSize: { xs: "0.875rem", md: "1rem" },
    py: { xs: 1.5, md: 2 },
  };

  return (
    <Card>
      <Box sx={{ p: { xs: 2, md: 0 } }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={cellStyles}>Title</TableCell>
                <TableCell sx={cellStyles}>Plays</TableCell>
                <TableCell sx={cellStyles}>Earnings</TableCell>
                <TableCell sx={cellStyles}>Ratings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {games.map((game) => (
                <TableRow
                  key={game.title}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: isDark ? "rgba(56, 189, 248, 0.08)" : "rgba(56, 189, 248, 0.04)",
                    },
                  }}
                >
                  <TableCell sx={bodyCellStyles}>{game.title}</TableCell>
                  <TableCell sx={secondaryCellStyles}>{game.plays.toLocaleString()}</TableCell>
                  <TableCell sx={secondaryCellStyles}>${game.earnings.toFixed(2)}</TableCell>
                  <TableCell sx={secondaryCellStyles}>{game.ratings.toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
}

