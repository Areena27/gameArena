import Head from "next/head";
import { Container, Typography, Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import UserLayout from "@/components/user/UserLayout";
import { Card, Button } from "@/components/common/ui/uiComponents";

export default function UserUpgrade() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleUpgrade = () => {
    // TODO: Navigate to payment module when integrated
    console.log("Navigate to payment module");
  };

  return (
    <>
      <Head>
        <title>Upgrade | CyberArena</title>
      </Head>
      <UserLayout>
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
              textAlign: "center",
            }}
          >
            Upgrade Account
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Grid container spacing={3} sx={{ maxWidth: "900px" }}>
              {/* Free Plan */}
              <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
                <Card sx={{ width: "100%", height: "100%", minHeight: "400px" }}>
                  <Box sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Jersey 10', sans-serif",
                        fontWeight: 400,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        mb: 2,
                        color: theme.palette.text.primary,
                      }}
                    >
                      Free Plan
                    </Typography>
                    <Typography variant="h3" sx={{ mb: 3, color: theme.palette.secondary.main }}>
                      $0
                      <Typography component="span" variant="body2" sx={{ color: theme.palette.text.secondary, ml: 1 }}>
                        /month
                      </Typography>
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        ✓ Access to free games
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        ✓ Basic game features
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        ✓ Community reviews
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        ✓ Standard support
                      </Typography>
                    </Box>
                    <Button
                      label="Current Plan"
                      variant="secondary"
                      disabled
                      sx={{ mt: 3 }}
                      fullWidth
                    />
                  </Box>
                </Card>
              </Grid>

              {/* Premium Plan */}
              <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
                <Card sx={{ width: "100%", height: "100%", minHeight: "400px" }}>
                  <Box sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "'Jersey 10', sans-serif",
                        fontWeight: 400,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        mb: 2,
                        color: theme.palette.text.primary,
                      }}
                    >
                      Premium Plan
                    </Typography>
                    <Typography variant="h3" sx={{ mb: 3, color: theme.palette.secondary.main }}>
                      $9.99
                      <Typography component="span" variant="body2" sx={{ color: theme.palette.text.secondary, ml: 1 }}>
                        /month
                      </Typography>
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        ✓ All free plan features
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        ✓ Access to premium games
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        ✓ Early access to new releases
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        ✓ Ad-free experience
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        ✓ Priority support
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        ✓ Exclusive content
                      </Typography>
                    </Box>
                    <Button
                      label="Upgrade to Premium"
                      onClick={handleUpgrade}
                      sx={{ mt: 3 }}
                      fullWidth
                    />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </UserLayout>
    </>
  );
}

