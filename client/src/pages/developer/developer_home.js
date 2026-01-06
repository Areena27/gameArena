import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Cookies } from "react-cookie";
import { setTheme } from "@/redux/slices/themeSlice";
import { Loader } from "@/components/common/ui/uiComponents";
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import HomeContent from "@/components/home/HomeContent";

const cookies = new Cookies();

export default function DeveloperHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    const themeMode = cookies.get("theme") || "dark";
    dispatch(setTheme(themeMode));
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Developer Home | CyberArena</title>
      </Head>
      <DeveloperLayout>
        <HomeContent heroSubtitle="Build, publish, and grow your games" />
      </DeveloperLayout>
    </>
  );
}
