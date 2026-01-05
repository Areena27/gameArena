import Head from "next/head";
import { useTheme } from "@mui/material/styles";
import {
  Container,
  Typography,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";

import DeveloperLayout from "@/components/common/DeveloperLayout";
import { Card } from "@/components/common/uiComponents";

const DUMMY_GAMES = [
  { title: "Neon Runner", plays: 1240, earnings: 312.5, ratings: 4.6 },
  { title: "Cyber Drift", plays: 860, earnings: 215.0, ratings: 4.2 },
  { title: "Arcade Pulse", plays: 540, earnings: 135.0, ratings: 4.0 },
];

export default function DeveloperDashboard() {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Developer Dashboard | CyberArena</title>
      </Head>
      <DeveloperLayout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography
            variant="h4"
            className="gaming-title"
            sx={{
              fontFamily: "'Jersey 10', sans-serif",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "2px",
              mb: 4,
            }}
          >
            Welcome back to Cyber Arena
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Card>
                <Box sx={{ p: 3 }}>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                    Total Plays
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "'Jersey 10', sans-serif",
                      fontWeight: 400,
                      color: theme.palette.secondary.main,
                    }}
                  >
                    2,640
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card>
                <Box sx={{ p: 3 }}>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                    Followers
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: "'Jersey 10', sans-serif",
                      fontWeight: 400,
                      color: theme.palette.secondary.main,
                    }}
                  >
                    418
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>

          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Plays</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Earnings</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Ratings</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DUMMY_GAMES.map((g) => (
                    <TableRow key={g.title} hover>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{g.title}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.secondary }}>{g.plays}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.secondary }}>${g.earnings.toFixed(2)}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.secondary }}>{g.ratings.toFixed(1)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Container>
      </DeveloperLayout>
    </>
  );
}

