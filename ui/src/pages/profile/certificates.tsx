import CertificateCard from "@/components/CertificateList";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";
const Activities = () => {
  return (
    <div className="container mx-auto flex md:flex-nowrap flex-wrap xl:flex-nowrap min-h-[calc(100vh-260px)]">
      <ProfileSideBar />
      <CertificateCard />
    </div>
  );
};

export default Activities;
