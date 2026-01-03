import Head from "next/head";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Box, Typography, Link } from "@mui/material";
import Cookies from "js-cookie";

import Layout from "@/components/common/layoutComponent";
import AuthLayout from "@/components/common/authLayout";
import { InputField, Button, Toast, Loader } from "@/components/common/uiComponents";
import { login } from "@/redux/slices/authSlice";
import { authAPI } from "@/services/api";
import { setTheme } from "@/redux/slices/themeSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    dispatch(setTheme(Cookies.get("theme") || "dark"));
  }, [dispatch]);

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("Email or Password is missing");
      setShowToast(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.login(form.email, form.password);

      if (!response?.token) {
        throw new Error("Login failed");
      }

      dispatch(
        login({
          token: response.token,
          role: response.data?.role || "user",
        })
      );

      router.push("/");
    } catch (err) {
      setError(err?.message || "Internal Server Error");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | CyberArena</title>
      </Head>

      <Layout>
        {loading && <Loader fullscreen />}

        <AuthLayout>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
            }}
          >
            <Typography
              variant="h4"
              className="gaming-title"
              sx={{
                fontFamily: "'Jersey 10', sans-serif",
                fontWeight: 400,
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Welcome Back!
            </Typography>

            <Typography variant="body2" sx={{ marginBottom: "16px" }}>
              Sign in to continue to CyberArena
            </Typography>

            <InputField
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={error && !form.email ? error : null}
              placeholder="Enter your email"
            />

            <InputField
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={error && !form.password ? error : null}
              placeholder="Enter your password"
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "-8px" }}>
              <Link
                href="/auth/forgotPassword"
                sx={{
                  fontSize: "14px",
                  color: "secondary.main",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              label={loading ? "Logging in..." : "Login"}
              onClick={handleLogin}
              disabled={loading}
              sx={{ marginTop: "8px" }}
            />

            <Box textAlign="center" mt="8px">
              <Typography variant="body2">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signUp"
                  sx={{
                    color: "secondary.main",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </AuthLayout>

        {showToast && error && (
          <Toast
            message={error}
            type="error"
            onClose={() => setShowToast(false)}
          />
        )}
      </Layout>
    </>
  );
}
