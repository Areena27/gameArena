import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, Grid, Container } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { gameAPI } from "@/services/api";
import { AdminGameTable, AdminSidebar, StatCard } from "@/components/admin/adminComponents";
import { Loader, Toast, Button } from "@/components/common/ui/uiComponents";
import Layout from "@/components/common/layout/layoutComponent";

export default function AdminPage() {
  const router = useRouter();
 
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGames, setTotalGames] = useState(0);
  const [acceptedGames, setAcceptedGames] = useState(0);
  const [rejectedGames, setRejectedGames] = useState(0);
  const [pendingGames, setPendingGames] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchPendingGames();
  }, [page]);

  useEffect(() => {
    fetchTotalGames();
    fetchGameStats();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (page === 1) {
        fetchPendingGames();
      } else {
        setPage(1);
      }
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const fetchPendingGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit: 10,
      };
      if (searchQuery) {
        params.keyword = searchQuery;
      }
      console.log("Fetching pending games with params:", params);
      const response = await gameAPI.listPendingGames(params);
      console.log("Pending games response:", response);
      setGames(response.data || []);
      setTotalPages(response.totalPages || 1);
      if (!response.data || response.data.length === 0) {
        console.log("No pending games found");
      }
    } catch (err) {
      console.error("Error fetching pending games:", err);
      const errorMessage = err.message || "Failed to fetch pending games";
      // Check if it's an authentication error
      if (errorMessage.includes("Network error") || errorMessage.includes("connection")) {
        setError("Cannot connect to server. Make sure the backend server is running on port 5001 and you are logged in as admin.");
      } else if (errorMessage.includes("Unauthorized") || errorMessage.includes("Token")) {
        setError("Please login as admin first. Go to /auth/login");
      } else {
        setError(errorMessage);
      }
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalGames = async () => {
    try {
      const response = await gameAPI.listAllGames({ limit: 10, page: 1 });
      //setTotalGames(response.totalDataCount || 0);
    } catch (err) {
      console.error("Failed to fetch total games:", err);
    }
  };

  const fetchGameStats = async () => {
    try {
      const response = await gameAPI.getGameStats();
      if (response?.success && response?.data) {
        setAcceptedGames(response.data.approved || 0);
       // setRejectedGames(response.data.rejected || 0);
       setPendingGames(response.data.pending || 0);
        setTotalGames(response.data.total || 0);
      }
    } catch (err) {
      console.error("Failed to fetch game stats:", err);
      setError(err.message || "Failed to fetch game stats");
      setShowToast(true);
    }
  };

  const handleApprove = async (gameId) => {
    try {
      await gameAPI.approveGame(gameId);
      setError(null);
      setSuccessMessage("Game approved successfully!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setSuccessMessage("");
      }, 3000);
      fetchPendingGames();
      fetchGameStats(); // Update stats
    } catch (err) {
      setError(err.message || "Failed to approve game");
      setSuccessMessage("");
      setShowToast(true);
    }
  };

  const handleReject = async (gameId) => {
    if (!confirm("Are you sure you want to reject (delete) this game?")) {
      return;
    }
    try {
      await gameAPI.rejectGame(gameId);
      setError(null);
      setSuccessMessage("Game rejected successfully!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setSuccessMessage("");
      }, 3000);
      fetchPendingGames();
      fetchGameStats(); // Update stats
    } catch (err) {
      setError(err.message || "Failed to reject game");
      setSuccessMessage("");
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
        <title>Admin Panel | CyberArena</title>
      </Head>
      <Layout>
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: { xs: "column", md: "row" },
            // Ensure full-page background matches theme in dark mode too
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <AdminSidebar currentPath={router.pathname} />
          <Box 
            sx={{ 
              flex: 1, 
              padding: { xs: "24px", md: "32px" }, 
              backgroundColor: (theme) => theme.palette.background.default,
              width: { xs: "100%", md: "calc(100% - 240px)" },
            }}
          >
            <Container maxWidth="xl" sx={{ px: { xs: 0, md: 2 } }}>
              {/* Page Title */}
              <Typography
                variant="h3"
                className="gaming-title"
                sx={{
                  fontFamily: "'Jersey 10', sans-serif",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  mb: 4,
                  color: (theme) => theme.palette.text.primary,
                  fontSize: { xs: "1.75rem", md: "2.5rem" },
                }}
              >
                Admin Dashboard
              </Typography>

              {/* Stats Cards */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <StatCard
                    title="Total Games"
                    value={totalGames}
                    icon={SportsEsportsIcon}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <StatCard
                    title="Games Accepted"
                    value={acceptedGames}
                    icon={CheckCircleIcon}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <StatCard
                    title="Games Pending"
                    value={pendingGames}
                    icon={CancelIcon}
                  />
                </Grid>
              </Grid>

              {/* Manage Pending Games Section */}
              <Box
                sx={{
                  backgroundColor: (theme) => theme.palette.background.paper,
                  borderRadius: "12px",
                  padding: { xs: "20px", md: "24px" },
                  mb: 4,
                  border: (theme) =>
                    `1px solid ${
                      theme.palette.mode === "dark" ? "rgba(56, 189, 248, 0.25)" : "rgba(56, 189, 248, 0.4)"
                    }`,
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 0 14px rgba(56, 189, 248, 0.15)"
                      : "0 0 8px rgba(56, 189, 248, 0.1)",
                }}
              >
                <Typography
                  variant="h5"
                  className="gaming-title"
                  sx={{
                    fontFamily: "'Jersey 10', sans-serif",
                    fontWeight: 400,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    mb: 3,
                    color: (theme) => theme.palette.text.primary,
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  Manage Pending Games
                </Typography>

              {error && (
                <Box sx={{ textAlign: "center", py: 4, mb: 2 }}>
                  <Typography variant="body1" sx={{ color: "#ef4444", mb: 2 }}>
                    ⚠️ Error: {error}
                  </Typography>
                  <Typography variant="body2" sx={{ color: (theme) => theme.palette.text.secondary, mb: 2 }}>
                    Make sure you are logged in as admin and the backend server is running.
                  </Typography>
                  <Button
                    label="Retry"
                    variant="primary"
                    onClick={() => {
                      setError(null);
                      fetchPendingGames();
                    }}
                  />
                </Box>
              )}
             
              {games.length === 0 && !loading && !error ? (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Typography variant="h6" sx={{ color: (theme) => theme.palette.text.secondary, mb: 2 }}>
                    No pending games to approve
                  </Typography>
                  <Typography variant="body2" sx={{ color: (theme) => theme.palette.text.secondary }}>
                    Create some games via Postman or the developer dashboard to see them here.
                  </Typography>
                </Box>
              ) : games.length > 0 ? (
                <>
                  <AdminGameTable
                    games={games}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                  />
                  {totalPages > 1 && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, mt: 4 }}>
                      <Button
                        label="Previous"
                        variant="secondary"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                      />
                      <Typography sx={{ px: 2, color: (theme) => theme.palette.text.primary }}>
                        &lt;&lt; {page} / {totalPages} &gt;&gt;
                      </Typography>
                      <Button
                        label="Next"
                        variant="secondary"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                      />
                    </Box>
                  )}
                </>
              ) : null}
              </Box>

              {showToast && (
                <Toast
                  message={error || successMessage || "Operation completed successfully"}
                  type={error ? "error" : "success"}
                  onClose={() => {
                    setShowToast(false);
                    setError(null);
                    setSuccessMessage("");
                  }}
                />
              )}
            </Container>
          </Box>
        </Box>
      </Layout>
    </>
  );
}