import Head from "next/head";
import { useRouter } from "next/router";
import { Container, Typography, Box } from "@mui/material";
import { UploadGameForm } from "@/components/common/developerComponents";
import Layout from "@/components/common/layoutComponent";

export default function UploadPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/developer/dashboard");
  };

  return (
    <>
      <Head>
        <title>Upload Game | CyberArena</title>
      </Head>
      <Layout>
        <Container maxWidth="md" sx={{ py: 4 }}>
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
            Upload New Game
          </Typography>
          <UploadGameForm onSuccess={handleSuccess} />
        </Container>
      </Layout>
    </>
  );
}

