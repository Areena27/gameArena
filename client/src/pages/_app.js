import "@/styles/globals.css";

import { Provider } from "react-redux";
import { Cookies } from "react-cookie";
import { useEffect } from "react";
import { store } from "@/redux/store";
import { initializeAuth } from "@/redux/slices/authSlice";
import { userAPI } from "@/services/api";

const cookies = new Cookies();

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const token = cookies.get("token");
    const role = cookies.get("role");
    if (token || role) {
      store.dispatch(
        initializeAuth({
          token: token || null,
          role: role || "guest",
        })
      );
    }

    // If token is httpOnly (server-set), it won't be readable here.
    // In that case, try to hydrate auth state by calling /user (cookie-based auth).
    if (!role) {
      userAPI
        .getUser()
        .then((res) => {
          const fetchedRole = res?.data?.role;
          if (res?.success && fetchedRole) {
            cookies.set("role", fetchedRole, { path: "/", maxAge: 60 * 60 * 24 * 7 });
            // token stays null; server will use cookie for API calls
            store.dispatch(
              initializeAuth({
                token: null,
                role: fetchedRole,
              })
            );
          }
        })
        .catch(() => {
          // ignore; user is not logged in
        });
    }
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
