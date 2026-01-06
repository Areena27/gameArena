import Head from "next/head";
import { useEffect } from "react";
import DeveloperLayout from "@/components/developer/DeveloperLayout";
import {
  ProfilePageContainer,
  ProfilePageTitle,
  ProfileSection,
  AccountInformationForm,
  ChangePasswordForm,
  ProfileToasts,
  useProfileForm,
} from "@/components/common/ProfileComponents";
import { Box } from "@mui/material";

export default function DeveloperProfile() {
  const { userData, setUserData, passwordData, setPasswordData, error, setError, success, setSuccess, handlePasswordChange } = useProfileForm();

  useEffect(() => {
    // TODO: Load user data from API
    setUserData({
      name: "Developer Name",
      email: "developer@example.com",
      age: "25",
    });
  }, [setUserData]);

  return (
    <>
      <Head>
        <title>Developer Profile | CyberArena</title>
      </Head>
      <DeveloperLayout>
        <ProfilePageContainer>
          <ProfilePageTitle>Profile Settings</ProfilePageTitle>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <ProfileSection title="Account Information">
              <AccountInformationForm userData={userData} setUserData={setUserData} />
            </ProfileSection>
            <ProfileSection title="Change Password">
              <ChangePasswordForm passwordData={passwordData} setPasswordData={setPasswordData} onSubmit={handlePasswordChange} />
            </ProfileSection>
          </Box>
          <ProfileToasts error={error} success={success} onErrorClose={() => setError(null)} onSuccessClose={() => setSuccess(false)} />
        </ProfilePageContainer>
      </DeveloperLayout>
    </>
  );
}
