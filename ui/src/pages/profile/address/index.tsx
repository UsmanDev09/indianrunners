import ProfileSideBar from "../../../components/Profile/ProfileSideBar";
import AddAdress from "../../../components/Profile/AddAdress";

const Addresses = () => {

  return (
    <div className="container mx-auto sm:flex xs:flex-wrap  xl:flex-nowrap min-h-[calc(100vh-260px)]">
      <ProfileSideBar />
      <AddAdress />
    </div>
  );
};

export default Addresses;
