import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiPencil } from "react-icons/bi";

import * as path from "../../constants/paths";
import Label from "../Label/Label";

const AddAdress = (propsd) => {
  const addressArray = [
    {
      title: "Primary",
      name: "Name Lastname",
      streetname: "Street Name 45",
      city: "City, Code 110000, Country",
    },
  ];
  return (
    <div className="p-16 w-full">
      <p className="font-unica text-[30px] py-5">SHIPPING ADDRESSES</p>
      <div className="max-w-[900px] font-comfortaa">
        {addressArray.map((ele, index) => {
          return (
            <div key={index}>
              <div className="flex justify-between max-w-[450px] w-full">
                <p>{ele.title}</p>
                <div className="flex">
                  <button className="px-2 py-1 rounded-full border-2 border-[#E1A933] flex items-center justify-center cursor-pointer">
                    <BiPencil className="text-[20px] text-[#E1A933]" />
                  </button>
                  <button className="ml-2 px-2 py-1 rounded-full border-2 border-[#E62744] flex items-center justify-center cursor-pointer">
                    <RiDeleteBin5Line className="text-[20px] text-[#E62744]" />
                  </button>
                </div>
              </div>
              <p>{ele.name}</p>
              <p>{ele.streetname}</p>
              <p>{ele.city}</p>
            </div>
          );
        })}
        <div className="mt-12">
          <Label label="Add New Address" />
          <Link
            href={`"/${path.PROFILE}/address/NewAddress"`}
            className="w-[60px] h-[60px] rounded-lg border-2 border-gray-300 border-dashed flex items-center justify-center cursor-pointer"
          >
            <AiOutlinePlus className="text-[20px] text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddAdress;
