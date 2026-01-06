import Head from "next/head";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import Layout from "@/components/common/layout/layoutComponent";
import AuthLayout from "@/components/common/layout/authLayout";
import { InputField, Button, Toast, Loader } from "@/components/common/ui/uiComponents";
import { AuthFormTitle, AuthFormSubtitle, AuthFormLink, AuthFormWrapper, AuthFormFooter } from "@/components/auth/AuthComponents";
import { login } from "@/redux/slices/authSlice";
import { authAPI, userAPI } from "@/services/api";
import { setTheme } from "@/redux/slices/themeSlice";
import { Box, Link } from "@mui/material";

const cookies = new Cookies();
const INITIAL_FORM = { email: "", password: "" };
const FORM_FIELDS = [
  { key: "email", label: "Email", type: "email", placeholder: "Enter your email" },
  { key: "password", label: "Password", type: "password", placeholder: "Enter your password" },
];

const validateForm = (form) => {
  if (!form.email || !form.password) return "Email or Password is missing";
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
    if (router.query.signupSuccess === "true") setShowSuccess(true);
  }, [dispatch, router.query]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
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
      if (!response?.success || !response?.token) throw new Error(response?.message || "Login failed");

      cookies.set("token", response.token, { path: "/", maxAge: 60 * 60 * 24 * 7 });

      let role = response.data?.role;
      if (!role) {
        try {
          await new Promise((resolve) => setTimeout(resolve, 100));
          const userResponse = await userAPI.getUser();
          if (userResponse?.success && userResponse?.data?.role) role = userResponse.data.role;
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
        }
      }

      role = role || "user";
      dispatch(login({ token: response.token, role }));

      const normalizedRole = role.toLowerCase().trim();
      router.push(normalizedRole === "developer" ? "/developer/developer_home" : "/user/home");
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
          <AuthFormWrapper>
            <AuthFormTitle>Welcome Back!</AuthFormTitle>
            <AuthFormSubtitle>Sign in to continue to CyberArena</AuthFormSubtitle>
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
            <AuthFormLink href="/auth/forgotPassword">Forgot Password?</AuthFormLink>
            <Button label={loading ? "Logging in..." : "Login"} onClick={handleLogin} disabled={loading} sx={{ marginTop: "8px" }} />
            <AuthFormFooter>
              Don&apos;t have an account?{" "}
              <Link href="/auth/signUp" sx={{ color: "secondary.main", fontWeight: 500, "&:hover": { textDecoration: "underline" } }}>
                Sign Up
              </Link>
            </AuthFormFooter>
          </AuthFormWrapper>
        </AuthLayout>
        {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
        {showSuccess && <Toast message="Account created successfully. Please login." type="success" onClose={() => setShowSuccess(false)} />}
      </Layout>
    </>
  );
}
