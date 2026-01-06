import Head from "next/head";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Cookies } from "react-cookie";
import { setTheme } from "@/redux/slices/themeSlice";
import { Loader } from "@/components/common/ui/uiComponents";
import Layout from "@/components/common/layout/layoutComponent";
import HomeContent from "@/components/home/HomeContent";
import { GameCategory, Hero } from "@/components/home/homeComponents";
import { racingGames, actionGames } from "@/data/gameData";

const cookies = new Cookies();

export default function Home() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ genre: "", keyword: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const theme = cookies.get("theme");
    if (theme) dispatch(setTheme(theme));
    setLoading(false);
  }, [dispatch]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) return <Loader fullscreen />;

  return (
    <>
      <Head>
        <title>CyberArena - Discover & Play Indie Games Instantly</title>
        <meta name="description" content="Join a growing community and explore something unique" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout filters={filters} onFilterChange={handleFilterChange}>
        <Hero />
        <HomeContent filters={filters} showHero={false} />
        <GameCategory title="RACING GAMES" description="Fast-paced racing action" category="racing" games={racingGames} />
        <GameCategory title="ACTION GAMES" description="Thrilling action-packed adventures" category="action" games={actionGames} />
      </Layout>
    </>
  );
}
