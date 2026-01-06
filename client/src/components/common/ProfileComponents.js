import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Card, InputField, Button, Toast } from "@/components/common/ui/uiComponents";

export function ProfilePageTitle({ children }) {
  return (
    <Typography
      variant="h4"
      className="gaming-title"
      sx={{
        fontFamily: "'Jersey 10', sans-serif",
        fontWeight: 400,
        textTransform: "uppercase",
        letterSpacing: "2px",
        mb: 4,
      }}
    >
      {children}
    </Typography>
  );
}

export function ProfileSection({ title, children }) {
  const theme = useTheme();

  return (
    <Card>
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Jersey 10', sans-serif",
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "1px",
            mb: 3,
            color: theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>{children}</Box>
      </Box>
    </Card>
  );
}

export function ProfilePageContainer({ children }) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {children}
    </Container>
  );
}

export function useProfileForm(initialUserData = { name: "", email: "", age: "" }) {
  const [userData, setUserData] = useState(initialUserData);
  const [passwordData, setPasswordData] = useState({ newPassword: "", confirmPassword: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = () => {
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // TODO: Call API to change password
    setSuccess(true);
    setPasswordData({ newPassword: "", confirmPassword: "" });
    setTimeout(() => setSuccess(false), 3000);
  };

  return {
    userData,
    setUserData,
    passwordData,
    setPasswordData,
    error,
    setError,
    success,
    setSuccess,
    handlePasswordChange,
  };
}

export function AccountInformationForm({ userData, setUserData }) {
  return (
    <>
      <InputField
        label="Name"
        type="text"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        fullWidth
      />
      <InputField
        label="Email"
        type="email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        fullWidth
      />
      <InputField
        label="Age"
        type="number"
        value={userData.age}
        onChange={(e) => setUserData({ ...userData, age: e.target.value })}
        fullWidth
      />
    </>
  );
}

export function ChangePasswordForm({ passwordData, setPasswordData, onSubmit }) {
  return (
    <>
      <InputField
        label="New Password"
        type="password"
        value={passwordData.newPassword}
        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
        placeholder="Enter new password"
        fullWidth
      />
      <InputField
        label="Confirm Password"
        type="password"
        value={passwordData.confirmPassword}
        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
        placeholder="Confirm new password"
        fullWidth
      />
      <Button label="Save Changes" onClick={onSubmit} sx={{ mt: 1 }} fullWidth />
    </>
  );
}

export function ProfileToasts({ error, success, onErrorClose, onSuccessClose }) {
  return (
    <>
      {error && <Toast message={error} type="error" onClose={onErrorClose} />}
      {success && <Toast message="Password changed successfully" type="success" onClose={onSuccessClose} />}
    </>
  );
}

