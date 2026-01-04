import Head from "next/head";
import { useState } from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Layout from "@/components/common/layoutComponent";
import { InputField, Button, Toast, Loader } from "@/components/common/uiComponents";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!EMAIL_REGEX.test(email)) return "Please enter a valid email address";
  return null;
};

export default function ForgotPasswordPage() {
  const theme = useTheme();
  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await authAPI.forgotPassword({ email });
      await new Promise((r) => setTimeout(r, 1500));
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setSuccess(false);
    setEmail("");
    setError(null);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setError(null);
  };

  const renderForm = () => (
    <>
      <Typography
        variant="h4"
        className="gaming-title"
        sx={{
          fontFamily: "'Jersey 10', sans-serif",
          fontWeight: 400,
          marginBottom: "8px",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        Forgot Password?
      </Typography>

      <Typography 
        variant="body2" 
        sx={{ 
          marginBottom: "32px", 
          textAlign: "center",
        }}
      >
        No worries! Enter your email address and we'll send you a link to reset your password.
      </Typography>

      <Box display="flex" flexDirection="column" gap="24px">
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          error={error && !email ? error : null}
          placeholder="Enter your email address"
        />

        <Button
          label={loading ? "Sending..." : "Send Reset Link"}
          onClick={handleSubmit}
          disabled={loading}
        />

        <Box textAlign="center" mt="8px">
          <Link
            href="/auth/login"
            sx={{
              color: theme.palette.secondary.main,
              fontSize: "14px",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Back to Login
          </Link>
        </Box>
      </Box>
    </>
  );

  const renderSuccess = () => (
    <Box textAlign="center" display="flex" flexDirection="column" gap="24px">
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 600,
        }}
      >
        Check Your Email
      </Typography>

      <Typography 
        variant="body2"
      >
        We've sent a password reset link to {email}
      </Typography>

      <Typography 
        variant="body2" 
        sx={{
          fontSize: "12px",
        }}
      >
        Didn't receive the email? Check your spam folder or try again.
      </Typography>

      <Box display="flex" flexDirection="column" gap="12px" mt="16px">
        <Button label="Resend Email" variant="secondary" onClick={handleResend} />
        <Link
          href="/auth/login"
          sx={{
            color: theme.palette.secondary.main,
            fontSize: "14px",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Back to Login
        </Link>
      </Box>
    </Box>
  );

  return (
    <>
      <Head>
        <title>Forgot Password | CyberArena</title>
      </Head>
      <Layout>
        {loading && <Loader fullscreen />}

        <Box display="flex" alignItems="center" justifyContent="center" p="24px" minHeight="80vh">
          <Container maxWidth="sm">
            <Box
              sx={(theme) => ({
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: "16px",
                padding: { xs: "32px", md: "48px" },
                boxShadow: `0 4px 20px ${
                  theme.palette.mode === "dark"
                    ? "rgba(56, 189, 248, 0.2)"
                    : "rgba(0, 0, 0, 0.1)"
                }`,
                border: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(56, 189, 248, 0.25)"
                    : "rgba(56, 189, 248, 0.2)"
                }`,
              })}
            >
              {success ? renderSuccess() : renderForm()}
            </Box>
          </Container>
        </Box>

        {error && (
          <Toast
            message={error}
            type="error"
            onClose={() => setError(null)}
          />
        )}
        
        {success && (
          <Toast
            message="Reset link sent successfully!"
            type="success"
            onClose={() => setSuccess(false)}
          />
        )}
      </Layout>
    </>
  );
}