import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import AccountInfo from "../../components/Profile/AccountInfo";

const Profile = () => {
  return (
    <div className="container mx-auto flex md:flex-nowrap flex-wrap">
      <ProfileSideBar />
      <AccountInfo />
    </div>
  );
};

export default Profile;
