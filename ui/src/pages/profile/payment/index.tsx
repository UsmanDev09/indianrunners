import ProfileSideBar from "../../../components/Profile/ProfileSideBar";
import AddPayment from "../../../components/Profile/AddPayment";

const Addresses = () => {
  return (
    <div className="container mx-auto flex md:flex-nowrap flex-wrap xl:flex-nowrap min-h-[calc(100vh-260px)]">
      <ProfileSideBar />
      <AddPayment />

    </div>
  );
};

export default Addresses;
