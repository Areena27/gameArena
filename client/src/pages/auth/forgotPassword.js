import Head from "next/head";
import { useState } from "react";
import { Box } from "@mui/material";
import Layout from "@/components/common/layout/layoutComponent";
import { InputField, Button, Toast, Loader } from "@/components/common/ui/uiComponents";
import { AuthFormContainer, AuthFormTitle, AuthFormSubtitle, AuthFormLink, AuthSuccessMessage } from "@/components/auth/AuthComponents";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!EMAIL_REGEX.test(email)) return "Please enter a valid email address";
  return null;
};

export default function ForgotPasswordPage() {
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

  return (
    <>
      <Head>
        <title>Forgot Password | CyberArena</title>
      </Head>
      <Layout>
        {loading && <Loader fullscreen />}
        <AuthFormContainer>
          {success ? (
            <AuthSuccessMessage title="Check Your Email" email={email} onResend={handleResend} backLink="/auth/login" />
          ) : (
            <>
              <AuthFormTitle center>Forgot Password?</AuthFormTitle>
              <AuthFormSubtitle center>No worries! Enter your email address and we&apos;ll send you a link to reset your password.</AuthFormSubtitle>
              <Box display="flex" flexDirection="column" gap="24px">
                <InputField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  error={error && !email ? error : null}
                  placeholder="Enter your email address"
                />
                <Button label={loading ? "Sending..." : "Send Reset Link"} onClick={handleSubmit} disabled={loading} />
                <AuthFormLink href="/auth/login" center>
                  Back to Login
                </AuthFormLink>
              </Box>
            </>
          )}
        </AuthFormContainer>
        {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
        {success && <Toast message="Reset link sent successfully!" type="success" onClose={() => setSuccess(false)} />}
      </Layout>
    </>
  );
}
