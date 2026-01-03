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

export default function SignUpPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [userType, setUserType] = useState("user");

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    dispatch(setTheme(Cookies.get("theme") || "dark"));
  }, [dispatch]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const handleSignUp = async () => {
    // 🔴 Must match backend validation message
    if (!form.name || !form.email || !form.password) {
      setError("some field missing");
      setShowToast(true);
      return;
    }

    // Frontend-only UX validations (kept intentionally)
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setShowToast(true);
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      setShowToast(true);
      return;
    }

    if (form.age && (form.age < 12 || form.age > 60)) {
      setError("Age must be between 12 and 60");
      setShowToast(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.signup({
        name: form.name,
        email: form.email,
        password: form.password,
        role: userType,
        age: parseInt(form.age),
        ...(form.dob && { dob: form.dob }),
      });

      // Safety: handle success:false with 200
      if (!response?.token) {
        throw new Error("Signup failed");
      }

      dispatch(
        login({
          token: response.token,
          role: response.data?.role || userType,
        })
      );

      router.push("/");
    } catch (err) {
      // Display backend message exactly
      setError(err?.message || "Internal Server Error");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up | CyberArena</title>
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
              {userType === "user"
                ? "SignUp for the Adventure"
                : "Create Developer Account"}
            </Typography>

            <Typography variant="body2" sx={{ marginBottom: "16px" }}>
              Create your account to get started
            </Typography>

            <Box display="flex" gap="12px" mb="8px">
              <Button
                label="User"
                variant={userType === "user" ? "primary" : "secondary"}
                onClick={() => setUserType("user")}
                sx={{ flex: 1 }}
              />
              <Button
                label="Developer"
                variant={userType === "developer" ? "primary" : "secondary"}
                onClick={() => setUserType("developer")}
                sx={{ flex: 1 }}
              />
            </Box>

            <InputField
              label="Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your name"
            />

            <InputField
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email"
            />

            <InputField
              label="Age"
              type="number"
              value={form.age}
              onChange={(e) => handleChange("age", e.target.value)}
              placeholder="Enter your age"
            />

            <InputField
              label="Date of Birth"
              type="date"
              value={form.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            <InputField
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              helperText="Minimum 8 characters"
              placeholder="Enter your password"
            />

            <InputField
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) =>
                handleChange("confirmPassword", e.target.value)
              }
              placeholder="Confirm your password"
            />

            <Button
              label={
                loading
                  ? "Creating Account..."
                  : userType === "user"
                  ? "Create User Account"
                  : "Create Developer Account"
              }
              onClick={handleSignUp}
              disabled={loading}
              sx={{ marginTop: "8px" }}
            />

            <Box textAlign="center" mt="8px">
              <Typography variant="body2">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  sx={{
                    color: "secondary.main",
                    fontWeight: 500,
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Login
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
