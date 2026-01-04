import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, Grid, Chip, IconButton, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { gameAPI } from "@/services/api";
import { Card, Button, Loader, Toast } from "@/components/common/uiComponents";
import Layout from "@/components/common/layoutComponent";

export default function DeveloperDashboard() {
  const router = useRouter();
  const theme = useTheme();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchGames();
  }, [page]);

  const fetchGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await gameAPI.listDeveloperGames({
        page,
        limit: 12,
      });
      setGames(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      setError(err.message || "Failed to fetch games");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (gameId) => {
    if (!confirm("Are you sure you want to delete this game?")) {
      return;
    }

    try {
      await gameAPI.deleteGame(gameId);
      fetchGames();
    } catch (err) {
      setError(err.message || "Failed to delete game");
      setShowToast(true);
    }
  };

  if (loading && games.length === 0) {
    return (
      <Layout>
        <Loader fullscreen />
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Developer Dashboard | CyberArena</title>
      </Head>
      <Layout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Typography variant="h4" className="gaming-title" sx={{ fontFamily: "'Jersey 10', sans-serif", fontWeight: 400, textTransform: "uppercase", letterSpacing: "2px" }}>
              My Games
            </Typography>
            <Button
              label="Upload New Game"
              onClick={() => router.push("/developer/upload")}
            />
          </Box>

          {games.length === 0 ? (
            <Card>
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                  No games found
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
                  Upload your first game to get started!
                </Typography>
                <Button
                  label="Upload Game"
                  onClick={() => router.push("/developer/upload")}
                />
              </Box>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {games.map((game) => (
                <Grid item xs={12} sm={6} md={4} key={game._id}>
                  <Card>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, flex: 1, mr: 1 }}>
                        {game.title}
                      </Typography>
                      <Box>
                        <IconButton
                          size="small"
                          onClick={() => router.push(`/developer/upload?id=${game._id}`)}
                          sx={{ color: theme.palette.secondary.main }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(game._id)}
                          sx={{ color: "error.main" }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {game.desc}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                      <Chip
                        label={game.genre}
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                      />
                      <Chip
                        label={game.status || "pending"}
                        size="small"
                        color={game.status === "approved" ? "success" : "warning"}
                        sx={{ textTransform: "capitalize" }}
                      />
                    </Box>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                      Created: {new Date(game.createdAt || Date.now()).toLocaleDateString()}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, mt: 4 }}>
              <Button
                label="Previous"
                variant="secondary"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              />
              <Typography sx={{ px: 2 }}>
                Page {page} of {totalPages}
              </Typography>
              <Button
                label="Next"
                variant="secondary"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              />
            </Box>
          )}

          {showToast && error && (
            <Toast
              message={error}
              type="error"
              onClose={() => setShowToast(false)}
            />
          )}
        </Container>
      </Layout>
    </>
  );
}

