import { Box, Typography, Link, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Button } from "@/components/common/ui/uiComponents";

export function AuthFormTitle({ children }) {
  return (
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
      {children}
    </Typography>
  );
}

export function AuthFormSubtitle({ children, center = false }) {
  return (
    <Typography
      variant="body2"
      sx={{
        marginBottom: center ? "32px" : "16px",
        textAlign: center ? "center" : "left",
      }}
    >
      {children}
    </Typography>
  );
}

export function AuthFormLink({ href, children, center = false }) {
  const theme = useTheme();
  
  return (
    <Box textAlign={center ? "center" : "flex-end"} mt={center ? "8px" : "-8px"}>
      <Link
        href={href}
        sx={{
          fontSize: "14px",
          color: theme.palette.secondary.main,
          fontWeight: center ? 400 : 500,
          "&:hover": { textDecoration: "underline" },
        }}
      >
        {children}
      </Link>
    </Box>
  );
}

export function AuthFormContainer({ children }) {
  const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" justifyContent="center" p="24px" minHeight="80vh">
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: "16px",
            padding: { xs: "32px", md: "48px" },
            boxShadow: `0 4px 20px ${
              theme.palette.mode === "dark" ? "rgba(56, 189, 248, 0.2)" : "rgba(0, 0, 0, 0.1)"
            }`,
            border: `1px solid ${
              theme.palette.mode === "dark" ? "rgba(56, 189, 248, 0.25)" : "rgba(56, 189, 248, 0.2)"
            }`,
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}

export function AuthFormWrapper({ children }) {
  return (
    <Box display="flex" flexDirection="column" gap="20px" width="100%">
      {children}
    </Box>
  );
}

export function AuthFormFooter({ children }) {
  return (
    <Box textAlign="center" mt="8px">
      <Typography variant="body2">{children}</Typography>
    </Box>
  );
}

export function AuthSuccessMessage({ title, email, onResend, backLink }) {
  const theme = useTheme();

  return (
    <Box textAlign="center" display="flex" flexDirection="column" gap="24px">
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="body2">We&apos;ve sent a password reset link to {email}</Typography>
      <Typography variant="body2" sx={{ fontSize: "12px" }}>
        Didn&apos;t receive the email? Check your spam folder or try again.
      </Typography>
      <Box display="flex" flexDirection="column" gap="12px" mt="16px">
        {onResend && <Button label="Resend Email" variant="secondary" onClick={onResend} />}
        <Link
          href={backLink}
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
}

