import ProfileSideBar from "../../../components/Profile/ProfileSideBar";
import NewAddressAdd from "../../../components/Profile/NewAddressAdd";

const NewProduct = () => {

  return (
    <div className="mx-auto mt-0 md:pl-16 sm:pl-8 sm:flex min-h-[calc(100vh-260px)]">
      <ProfileSideBar />
      <NewAddressAdd />
    </div>
  );
};

export default NewProduct;
