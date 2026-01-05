import Head from "next/head";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography, Grid, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Cookies } from "react-cookie";
import { setTheme } from "@/redux/slices/themeSlice";
import { gameAPI } from "@/services/api";
import { GameCard } from "@/components/common/gameComponents";
import { Loader, Toast, Button } from "@/components/common/uiComponents";
import UserLayout from "@/components/common/UserLayout";
import { GameCategory, PlatformFeatures } from "@/components/common/homeComponents";

const cookies = new Cookies();

const featuredGames = [
  { name: "Stellar Blade", developer: "dev_stellar", image: "/featuredGames/stellarBlade.webp" },
  { name: "Need For Speed", developer: "dev_nfs", image: "/featuredGames/needForSpeed.jpg" },
  { name: "Fortnite", developer: "dev_fortnite", image: "https://tse4.mm.bing.net/th/id/OIP.C5A17VtI1jviPImGPZqAXgHaEK?pid=ImgDet&w=178&h=99&c=7&dpr=1.5&o=7&rm=3" },
  { name: "WWE 2K24", developer: "dev_nba", image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/59f0f0b7-ac9c-4bb3-947e-bc0e3be8398a/dgetpv5-ff390344-50bb-4caa-a04c-fff4e117d91c.jpg/v1/fill/w_1024,h_1290,q_75,strp/wwe_2k24_cover_design_11___roman_reigns_by_cngjl1986_dgetpv5-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI5MCIsInBhdGgiOiJcL2ZcLzU5ZjBmMGI3LWFjOWMtNGJiMy05NDdlLWJjMGUzYmU4Mzk4YVwvZGdldHB2NS1mZjM5MDM0NC01MGJiLTRjYWEtYTA0Yy1mZmY0ZTExN2Q5MWMuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.zPFxpdWIWNUdVf9o43-4ZX3Ms7dtsCfVLVU7I3WnZgg" },
  { name: "Fable Legends", developer: "dev_fable", image: "https://images.alphacoders.com/655/655398.jpg" },
  { name: "Mortal Kombat 1", developer: "dev_mk", image: "https://cdn1.epicgames.com/offer/fda0f2b4047f46ffb4e94d5595c1468e/EGS_MortalKombat1PremiumEdition_NetherRealmStudios_Editions_S1_2560x1440-43d47cfc125118b13b26cea9c80ae15c" },
  { name: "The Witcher 3", developer: "dev_witcher", image: "https://cdn.mos.cms.futurecdn.net/rjhoJx3c4TR8H5kXjYpUKm.jpg" },
  { name: "Cyberpunk 2077", developer: "dev_cyberpunk", image: "https://cdn1.epicgames.com/offer/carousel/cyberpunk-2077_1200x1600_1200x1600-405c9c60e3c1c100d8e0baa36f60b955" },
  { name: "Red Dead Redemption 2", developer: "dev_rdr2", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg" },
  { name: "Horizon Zero Dawn", developer: "dev_horizon", image: "https://cdn1.epicgames.com/offer/carousel/HZD_1200x1600_1200x1600-4c0b5c5e0b3e5c0b5c5e0b3e5c0b5c5e" }
];

const popularGames = [
  { name: "GTA V", developer: "dev_gta", image: "https://tse2.mm.bing.net/th/id/OIP.CjjkN8QUmOp0whkyl-7g5AHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Call of Duty", developer: "dev_cod", image: "https://tse3.mm.bing.net/th/id/OIP.HCb9qcYZmDUtf_FFHTdWSwHaFP?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Valorant", developer: "dev_valorant", image: "https://editors.dexerto.com/wp-content/uploads/2020/12/breach-and-sage-2.jpg" },
  { name: "Hollow Knight", developer: "dev_hollow", image: "https://th.bing.com/th/id/OIP.QHEXc9DyAPMC-00O2gRjrAHaEu?w=281&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" },
  { name: "Undertale", developer: "dev_undertale", image: "https://www.kolpaper.com/wp-content/uploads/2020/05/Undertale-Wallpaper.jpg" },
  { name: "Hades", developer: "dev_hades", image: "https://store-images.s-microsoft.com/image/apps.48496.14093828725404571.e8c4fd85-da7e-4c33-9a85-c97c9f3eeb38.fde6f3ed-4a08-4bb8-8240-9cd19e049803" },
  { name: "Among Us", developer: "dev_amongus", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg" },
  { name: "Fall Guys", developer: "dev_fallguys", image: "https://cdn2.unrealengine.com/egs-fallguys-mediatonic-g1a-00-1920x1080-1920x1080-1920x1080-1920x1080-1920x1080-1920x1080-1920x1080-1920x1080.jpg" },
  { name: "Apex Legends", developer: "dev_apex", image: "https://cdn1.epicgames.com/offer/carousel/apex-legends_1200x1600_1200x1600-1200x1600-1200x1600-1200x1600" },
  { name: "Rocket League", developer: "dev_rocket", image: "https://cdn1.epicgames.com/offer/carousel/rocket-league_1200x1600_1200x1600-1200x1600-1200x1600-1200x1600" }
];

export default function UserHome() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const theme = cookies.get("theme");
    if (theme) {
      dispatch(setTheme(theme));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchGames();
  }, [page]);

  const fetchGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit: 12,
      };

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

  if (loading && games.length === 0) {
    return <Loader fullscreen />;
  }

  return (
    <>
      <Head>
        <title>User Home | CyberArena</title>
      </Head>
      <UserLayout>
        <Box sx={{ width: "100%", minHeight: "100vh" }}>
          {/* Hero section (no GIF) */}
          <Box
            component="section"
            sx={{
              position: "relative",
              width: "100%",
              minHeight: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: theme.palette.mode === "dark"
                ? "linear-gradient(135deg, rgba(2, 6, 23, 0.85) 0%, rgba(34, 48, 80, 0.55) 100%)"
                : "linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
              borderBottom: `1px solid ${theme.palette.mode === "dark" ? "rgba(56, 189, 248, 0.2)" : "rgba(56, 189, 248, 0.1)"}`,
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
                    background: theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)"
                      : "linear-gradient(135deg, #a855f7 0%, #38bdf8 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: theme.palette.mode === "dark" ? "0 0 30px rgba(56, 189, 248, 0.3)" : "none",
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
                  Join a growing community and explore something unique
                </Typography>
              </Box>
            </Container>
          </Box>

          {/* Featured Games Section */}
          <Box id="featured-games">
            <GameCategory
              title="FEATURED GAMES"
              description="Handpicked featured games found by the community"
              category="featured"
              games={featuredGames}
            />
          </Box>

          {/* Popular Games Section */}
          <GameCategory
            title="POPULAR GAMES"
            description="Trending games loved by the community"
            category="popular"
            games={popularGames}
          />

          {/* Platform Features Section */}
          <PlatformFeatures />

          {/* All Games Section */}
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
      </UserLayout>
    </>
  );
}

