import Head from "next/head";
import { Container } from "@mui/material";
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import { DashboardTitle, DashboardStats, DashboardTable } from "@/components/developer/DashboardComponents";

const DUMMY_GAMES = [
  { title: "Neon Runner", plays: 1240, earnings: 312.5, ratings: 4.6 },
  { title: "Cyber Drift", plays: 860, earnings: 215.0, ratings: 4.2 },
  { title: "Arcade Pulse", plays: 540, earnings: 135.0, ratings: 4.0 },
];

const stats = [
  { label: "Total Plays", value: "2,640" },
  { label: "Followers", value: "418" },
];

export default function DeveloperDashboard() {
  return (
    <>
      <Head>
        <title>Developer Dashboard | CyberArena</title>
      </Head>
      <DeveloperLayout>
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 3 } }}>
          <DashboardTitle>Welcome back to Cyber Arena</DashboardTitle>
          <DashboardStats stats={stats} />
          <DashboardTable games={DUMMY_GAMES} />
        </Container>
      </DeveloperLayout>
    </>
  );
}
