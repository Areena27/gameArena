import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Cookies } from "react-cookie";
import { setTheme } from "@/redux/slices/themeSlice";
import { Loader } from "@/components/common/ui/uiComponents";
import UserLayout from "@/components/user/UserLayout";
import HomeContent from "@/components/home/HomeContent";

const cookies = new Cookies();

export default function UserHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    const theme = cookies.get("theme");
    if (theme) dispatch(setTheme(theme));
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>User Home | CyberArena</title>
      </Head>
      <UserLayout>
        <HomeContent heroSubtitle="Join a growing community and explore something unique" />
      </UserLayout>
    </>
  );
}
