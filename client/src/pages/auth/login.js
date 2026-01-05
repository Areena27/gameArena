import Head from "next/head";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Box, Typography, Link } from "@mui/material";
import { Cookies } from "react-cookie";

import Layout from "@/components/common/layoutComponent";
import AuthLayout from "@/components/common/authLayout";
import { InputField, Button, Toast, Loader } from "@/components/common/uiComponents";
import { login } from "@/redux/slices/authSlice";
import { authAPI, userAPI } from "@/services/api";
import { setTheme } from "@/redux/slices/themeSlice";

const cookies = new Cookies();

const INITIAL_FORM = { email: "", password: "" };

const FORM_FIELDS = [
  { key: "email", label: "Email", type: "email", placeholder: "Enter your email" },
  { key: "password", label: "Password", type: "password", placeholder: "Enter your password" },
];

const validateForm = (form) => {
  if (!form.email || !form.password) {
    return "Email or Password is missing";
  }
  return null;
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const theme = cookies.get("theme") || "dark";
    dispatch(setTheme(theme));
    
    if (router.query.signupSuccess === "true") {
      setShowSuccess(true);
    }
  }, [dispatch, router.query]);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setError(null);
  };

  const handleLogin = async () => {
    const validationError = validateForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.login({ email: form.email, password: form.password });

      if (!response?.success || !response?.token) {
        throw new Error(response?.message || "Login failed");
      }

      // Set token cookie first for authenticated requests
      cookies.set("token", response.token, { path: "/", maxAge: 60 * 60 * 24 * 7 });

      // Get role from response or fetch from user profile
      let role = response.data?.role;
      if (!role) {
        try {
          await new Promise(resolve => setTimeout(resolve, 100));
          const userResponse = await userAPI.getUser();
          if (userResponse?.success && userResponse?.data?.role) {
            role = userResponse.data.role;
          }
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
        }
      }

      // Default to user if role still not found
      role = role || "user";

      dispatch(login({
        token: response.token,
        role: role,
      }));

      // Role-based routing
      const normalizedRole = role.toLowerCase().trim();
      if (normalizedRole === "developer") {
        router.push("/developer/developer_home");
      } else {
        router.push("/user/home");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Internal Server Error");
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
          <Box display="flex" flexDirection="column" gap="20px" width="100%">
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

            {FORM_FIELDS.map(({ key, label, type, placeholder }) => (
              <InputField
                key={key}
                label={label}
                type={type}
                value={form[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                error={error && !form[key] ? error : null}
                placeholder={placeholder}
              />
            ))}

            <Box display="flex" justifyContent="flex-end" mt="-8px">
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

        {error && (
          <Toast
            message={error}
            type="error"
            onClose={() => setError(null)}
          />
        )}

        {showSuccess && (
          <Toast
            message="Account created successfully. Please login."
            type="success"
            onClose={() => setShowSuccess(false)}
          />
        )}
      </Layout>
    </>
  );
}