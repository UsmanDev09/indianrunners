import ProfileSideBar from "../../../components/Profile/ProfileSideBar";
import ConnectApp from "../../../components/Profile/ConnectApp";

const Apps = () => {
  return (
    <div className="container mx-auto flex md:flex-nowrap flex-wrap xl:flex-nowrap min-h-[calc(100vh-260px)]">
      <ProfileSideBar />
      <ConnectApp />
    </div>
  );
};

export default Apps;
