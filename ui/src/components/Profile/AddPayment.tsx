import Link from "next/link";
import { CiCreditCard1 } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiPencil } from "react-icons/bi";
import Label from "../Label/Label";

const AddPayment = (props: any) => {
  const addressArray = [
    {
      title: "master card",
      address: "Name Lastname, Street Name 45, City, Code 11000, Country",
    },
  ];
  return (
    <div className="p-16 w-full">
      <p className="font-unica text-[30px] py-5">PAYMENT METHODS</p>
      <div className="max-w-[900px] font-comfortaa">
        <p className="font-bold my-2">Preffered</p>
        {addressArray.map((ele, index) => {
          return (
            <div key={index}>
              <div className="flex items-center justify-between max-w-[900px] w-full">
                <div>
                  <p>{ele.title}</p>
                  <p>
                    <span className="font-unica mr-4 font-bold">
                      BILLING ADDRESS
                    </span>
                    {ele.address}
                  </p>
                </div>
                <div className="flex">
                  <button className="px-2 py-1 rounded-full border-2 border-[#E1A933] flex items-center justify-center cursor-pointer">
                    <BiPencil className="text-[20px] text-[#E1A933]" />
                  </button>
                  <button className="ml-2 px-2 py-1 rounded-full border-2 border-[#E62744] flex items-center justify-center cursor-pointer">
                    <RiDeleteBin5Line className="text-[20px] text-[#E62744]" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="mt-12">
          <Label label="Add new payment method" />
          <div className="flex xl:flex-row flex-col ">
            <button className="w-[200px] flex justify-center items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg mr-8 xl:mb-0 mb-2">
              <img src="/images/Google_Pay_Logo.svg" alt="Google Pay" />
            </button>
            <button className="w-[200px] flex justify-center items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg mr-8 xl:mb-0 mb-2">
              <img src="/images/PayPal.svg" alt="Google Pay" />
            </button>
            <button className="w-[200px] flex justify-center items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg mr-8 xl:mb-0 mb-2">
              <img src="/images/Stripe_Logo.svg" alt="Google Pay" />
            </button>
            <Link
              href="/profile/payment/new"
              className="w-[200px] flex justify-center items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg mr-8"
            >
              <CiCreditCard1 className="text-[20px] mr-2" />{" "}
              <span>Add Credit Card</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPayment;
