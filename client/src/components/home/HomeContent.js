import { useState, useEffect, useMemo } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { gameAPI } from "@/services/api";
import { GameCard } from "@/components/game/gameComponents";
import { Loader, Toast, Button } from "@/components/common/ui/uiComponents";
import { GameCategory, PlatformFeatures } from "@/components/home/homeComponents";
import HeroSection from "@/components/home/HeroSection";
import { featuredGames, popularGames } from "@/data/gameData";

// Re-export for backward compatibility
export { featuredGames, popularGames };

export default function HomeContent({ 
  heroSubtitle = "Join a growing community and explore something unique",
  showHero = true,
  showFeaturedGames = true,
  showPopularGames = true,
  showPlatformFeatures = true,
  filters = null
}) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const filterKey = useMemo(() => JSON.stringify(filters || {}), [filters?.genre, filters?.keyword]);

  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterKey]);

  const fetchGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit: 12 };
      if (filters?.genre) params.genre = filters.genre;
      if (filters?.keyword) params.keyword = filters.keyword;
      
      const response = await gameAPI.listAllGames(params);
      setGames(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      setError(err.message || "Failed to fetch games");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      {showHero && <HeroSection subtitle={heroSubtitle} />}
      {showFeaturedGames && (
        <Box id="featured-games">
          <GameCategory title="FEATURED GAMES" description="Handpicked featured games found by the community" category="featured" games={featuredGames} />
        </Box>
      )}
      {showPopularGames && <GameCategory title="POPULAR GAMES" description="Trending games loved by the community" category="popular" games={popularGames} />}
      {showPlatformFeatures && <PlatformFeatures />}
      {games.length > 0 && (
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: { xs: "24px", md: "48px" } }}>
          {loading ? (
            <Box sx={{ textAlign: "center", padding: "48px" }}>
              <Loader />
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {games.map((game) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={game._id}>
                    <GameCard
                      title={game.title}
                      genre={game.genre}
                      thumbnail={game.avatar?.url || "/placeholder-game.png"}
                      averageRating={game.averageRating || 0}
                      totalReviews={game.totalReviews || 0}
                      onPlay={() => {
                        window.location.href = `/game/${game._id}`;
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
                  <Button
                    label="Previous"
                    variant="secondary"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  />
                  <Typography sx={{ alignSelf: "center", padding: "0 16px" }}>
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
            </>
          )}

          {showToast && error && (
            <Toast
              message={error}
              type="error"
              onClose={() => setShowToast(false)}
            />
          )}
        </Box>
      )}
    </Box>
  );
}

