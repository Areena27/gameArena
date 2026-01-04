import "@/styles/globals.css";

import { Provider } from "react-redux";
import { Cookies } from "react-cookie";
import { useEffect } from "react";
import { store } from "@/redux/store";
import { initializeAuth } from "@/redux/slices/authSlice";

const cookies = new Cookies();

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const token = cookies.get("token");
    const role = cookies.get("role");
    if (token || role) {
      store.dispatch(initializeAuth({
        token: token || null,
        role: role || "guest",
      }));
    }
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
