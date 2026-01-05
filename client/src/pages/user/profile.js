import Head from "next/head";
import { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import UserLayout from "@/components/common/UserLayout";
import { Card, InputField, Button, Toast } from "@/components/common/uiComponents";

export default function UserProfile() {
  const theme = useTheme();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // TODO: Load user data from API
    setUserData({
      name: "User Name",
      email: "user@example.com",
      age: "25",
    });
  }, []);

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

  return (
    <>
      <Head>
        <title>User Profile | CyberArena</title>
      </Head>
      <UserLayout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
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
            Profile Settings
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Account Information */}
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
                  Account Information
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                </Box>
              </Box>
            </Card>

            {/* Change Password */}
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
                  Change Password
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                  <Button
                    label="Save Changes"
                    onClick={handlePasswordChange}
                    sx={{ mt: 1 }}
                    fullWidth
                  />
                </Box>
              </Box>
            </Card>
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
              message="Password changed successfully"
              type="success"
              onClose={() => setSuccess(false)}
            />
          )}
        </Container>
      </UserLayout>
    </>
  );
}

