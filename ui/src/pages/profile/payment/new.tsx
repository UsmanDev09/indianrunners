import ProfileSideBar from "../../../components/Profile/ProfileSideBar";
import NewPaymentAdd from "../../../components/Profile/NewPaymentAdd";

const NewProduct = () => {

  return (
    <div className="mx-auto mt-0 md:pl-16 sm:pl-8 sm:flex min-h-[calc(100vh-260px)]">
      <ProfileSideBar />
      <NewPaymentAdd />
    </div>
  );
};

export default NewProduct;
