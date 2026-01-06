import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "@/components/common/layout/layoutComponent";
import { GamesPageContainer, GamesPageHeader, GamesGrid } from "@/components/game/GamesPageComponents";
import { gameCategories } from "@/data/gameData";

export default function GamesPage() {
  const router = useRouter();
  const { category } = router.query;
  const categoryData = gameCategories[category] || gameCategories.featured;

  return (
    <>
      <Head>
        <title>{categoryData.title} - CyberArena</title>
        <meta name="description" content={categoryData.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <GamesPageContainer>
          <GamesPageHeader title={categoryData.title} description={categoryData.description} />
          <GamesGrid games={categoryData.games} />
        </GamesPageContainer>
      </Layout>
    </>
  );
}
