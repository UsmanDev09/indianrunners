import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import sourceImage from "../../public/images/default-image.jpg";
import { AiOutlinePlus } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
// import startIcon from "../../public/images/star.svg";

const AccountInfo = (props) => {
  // const [files, setFiles] = useState(sourceImage.src);
  const handleUploadClick = (e) => {
    [...e.target.files].forEach((file) => {
      var reader = new FileReader();
      reader.onload = function (evt) {
        setFiles(evt.target.result);
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <div className="pt-16 md:pl-16 pl-0  flex flex-wrap justify-between w-full">
      <div className="md:w-[20%] min-w-[180px] ">
        <div className="relative">
          {/* <img
            src={files}
            alt="Icon"
            className="rounded-lg w-[180px] h-[180px]"
          /> */}
          <label
            htmlFor="contained-button-file"
            className="absolute ml-[40px] -mt-5 font-comfortaa bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-[12px] shadow"
          >
            <input
              accept=".png,.jpg"
              id="contained-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleUploadClick}
            />
            Change
          </label>
        </div>
      </div>
      <div className="lg:px-8 item-left w-full ">
        <div>
          <p className="font-unica text-[30px] py-5">PROFILE NAME</p>
          <p className="font-comfortaa">
            Short profile introduction, this is dummy placeholder text to fill
            out this text box --- Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Aenean dolor sem, tincidunt et bibendum non,
            convallis eget mauris. Suspendisse in gravida lorem. Nulla massa
            enim, ultricies at dictum non, placerat vel tellus.{" "}
          </p>
        </div>
        <div className="py-8">
          <p className="font-unica text-[25px]">PROFILE RATING</p>
          <div className="items-center flex">
            {/* <Image src={startIcon} alt={"Icon"} />
            &nbsp;
            <Image src={startIcon} alt={"Icon"} />
            &nbsp;
            <Image src={startIcon} alt={"Icon"} />
            &nbsp;
            <Image src={startIcon} alt={"Icon"} />
            &nbsp;
            <Image src={startIcon} alt={"Icon"} /> */}
            &nbsp; &nbsp; 4.6&nbsp; &nbsp; |&nbsp; &nbsp;
            <p className="font-comfortaa"> 27 ratings</p>
          </div>
        </div>
        <div className="py-8">
          <p className="font-unica text-[25px]">TOTAL EARNING</p>
          <div className="flex items-center">
            <p className="font-unica text-[30px]">$4K+&nbsp; &nbsp; </p>
            <p className="font-comfortaa">| &nbsp; 63 items sold</p>
          </div>
        </div>
        <div className="py-8">
          <p className="font-unica text-[25px]">PROFILE CONTACT</p>
          <div className="flex items-center">
            <p className="text-gray-700 text-[15px] min-w-[150px]">EMAIL </p>
            <p className="font-comfortaa">thisismyemail@mail.com</p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-700 text-[15px] min-w-[150px]">
              PHONE NUMBER{" "}
            </p>
            <p className="font-comfortaa">+1234567890</p>
          </div>
        </div>
      </div>
      <div className="md:w-[20%] min-w-[250px] ">
        <div>
          <Link
            href="/profile/new"
            className="hover:bg-[#A042E1] font-comfortaa inline-flex items-center bg-white  text-gray-800 font-semibold py-2 px-4 rounded-[12px] shadow"
          >
            <AiOutlinePlus className="text-[20px]" /> &nbsp;
            <button type="button">List new Product</button>
          </Link>
        </div>
        <div>
          <Link
            href="/profile"
            className="hover:bg-[#A042E1] xs:mb-4 lg:mb-0 hover:text-white font-comfortaa inline-flex items-center bg-white  text-gray-800 font-semibold py-2 px-4 rounded-[12px] shadow mt-5"
          >
            <BiPencil className="text-[20px]" /> &nbsp;Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
