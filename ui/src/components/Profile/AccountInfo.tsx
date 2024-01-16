import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import sourceImage from "../../public/images/default-image.jpg";
import { AiOutlinePlus } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
// import startIcon from "../../public/images/star.svg";

const AccountInfo = ({user} : {user: any}) => {

  const handleUploadClick = (e: Event) => {
    // [...e.target.files].forEach((file) => {
    //   var reader = new FileReader();
    //   reader.onload = function (evt) {
    //     setFiles(evt.target.result);
    //   };
    //   reader.readAsDataURL(file);
    // });
  };
  return (
    <div className="pt-16 md:pl-16 pl-0 flex flex-wrap justify-between w-full">
      <div className="w-full">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-black dark:text-white">
            Profile Completion
          </span>
          <span className="text-sm font-medium text-black dark:text-white">
            {user?.profileCompleted ? user?.profileCompleted : 0}%
          </span>
        </div>
        <div className="w-full border border-black dark:border-white rounded-full p-1 dark:bg-gray-700">
          <div
            className="bg-gray-700 h-2.5 rounded-full dark:bg-dark-button"
            style={{ width: `${user?.profileCompleted ? user?.profileCompleted : 0}% ` }}
          ></div>
        </div>
      </div>
      <div className="md:w-[20%] min-w-[180px] ">
        {/* <div className="relative">
          {/* <img
            src={files}
            alt="Icon"
            className="rounded-lg w-[180px] h-[180px]"
          /> */}
        {/* <label
            htmlFor="contained-button-file"
            className="absolute ml-[40px] -mt-5 font-comfortaa bg-white dark:bg-pink dark:text-blue-text hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-[12px] shadow"
          >
            <input
              accept=".png,.jpg"
              id="contained-button-file"
              type="file"
              style={{ display: "none" }}
              // onChange={handleUploadClick}
            />
            Change
          </label>
        </div> */}
      </div>{" "}
      <div className="item-left w-full dark:text-blue-text">
        <div>
          <p className="font-unica text-[30px] py-5">
            {user?.name}
          </p>
          <p className="font-comfortaa">
            Short profile introduction, this is dummy placeholder text to fill
            out this text box --- Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Aenean dolor sem, tincidunt et bibendum non,
            convallis eget mauris. Suspendisse in gravida lorem. Nulla massa
            enim, ultricies at dictum non, placerat vel tellus.{" "}
          </p>
        </div>

        <div className="py-8">
          <p className="font-unica text-[25px]">PROFILE CONTACT</p>
          <div className="flex items-center">
            <p className="text-gray-700 text-[15px] min-w-[150px]">EMAIL </p>
            <p className="font-comfortaa">{user?.email}</p>
          </div>
          
        </div>
      </div>
      <div className="md:w-[20%] min-w-[250px] ">
        <div>
          <Link
            href="/profile/complete-profile"
            className="text-black xs:mb-4 lg:mb-0 dark:text-blue-text hover:bg-gray-700 hover:text-white dark:bg-dark-button dark:hover:bg-gray font-comfortaa inline-flex items-center bg-white  text-gray-800 font-semibold py-2 px-4 rounded-[12px] shadow mt-5"
          >
            <BiPencil className="text-[20px]" /> Complete Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
