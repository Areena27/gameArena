import Head from "next/head";
import Layout from "@/components/common/layout/layoutComponent";
import { BlogPlaceholder } from "@/components/common/BlogComponents";

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog - CyberArena</title>
        <meta name="description" content="Read the latest news and updates from CyberArena" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <BlogPlaceholder />
      </Layout>
    </>
  );
}
