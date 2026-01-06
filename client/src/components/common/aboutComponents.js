import { Box, Typography, Container } from "@mui/material";

export function AboutPageContainer({ children }) {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 }, minHeight: "60vh" }}>
      {children}
    </Container>
  );
}

export function AboutPageTitle({ children }) {
  return (
    <Typography
      variant="h2"
      className="gaming-title"
      fontFamily="'Jersey 10', sans-serif"
      textTransform="uppercase"
      letterSpacing="3px"
      mb={4}
      fontSize={{ xs: "2rem", md: "3rem" }}
    >
      {children}
    </Typography>
  );
}

export function AboutSection({ title, children }) {
  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={2} fontSize={{ xs: "1.25rem", md: "1.5rem" }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

export function FeatureItem({ title, description }) {
  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={1}>
        {title}
      </Typography>
      <Typography variant="body2" lineHeight={1.7}>
        {description}
      </Typography>
    </Box>
  );
}

