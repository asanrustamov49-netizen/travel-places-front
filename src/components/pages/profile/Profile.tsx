"use client";
import MainProfile from "@/components/widgets/mainProfile/MainProfile";
import ProfilePanel from "@/components/widgets/profilePanel/ProfilePanel";
import { useProfile } from "@/hooks/functions/auth/useProfile";

const Profile = () => {
  const { data, isLoading, isError } = useProfile();
  if (isLoading) {
    return <div>Loading profile...</div>;
  }
  if (isError || !data) {
    return <div>Failed to load profile.</div>;
  }

  return (
    <div>
      <MainProfile profile={data} />;
      <ProfilePanel profile={data}/>;
    </div>
  );
};

export default Profile;
