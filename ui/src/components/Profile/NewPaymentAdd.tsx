import React, { useState } from "react";
// import { Listbox } from "@headlessui/react";
// import Select from "./element/Select";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import sourceImage from "../../public/images/default-image.jpg";
import { CiCreditCard1 } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { BiPencil } from "react-icons/bi";
import startIcon from "../../public/images/star.svg";
// import { Menu, Transition } from "@headlessui/react";
import Datepicker from "./element/DatePicker";
import Label from "../Label/Label";
// import Button from "../Buttons/Button";
const NewPaymentAdd = (props: any) => {
  const courtries = [
    {
      label: "Choose country",
      value: "",
      unavailable: true,
    },
    {
      label: "United States",
      value: "US",
      unavailable: false,
    },
    {
      label: "Italy",
      value: "it",
      unavailable: false,
    },
  ];
  const [coutry, setCountry] = useState(courtries[0]);
  const provinceArray = [
    {
      label: "Choose Province",
      value: "",
      unavailable: true,
    },
    {
      label: "Province-1",
      value: "p-1",
      unavailable: false,
    },
    {
      label: "Province-2",
      value: "p-2",
      unavailable: false,
    },
  ];
  const [value, onChange] = useState(new Date());
  const [province, setProvince] = useState(provinceArray[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="p-16 w-full">
      <p className="font-unica text-[30px] py-5">ADD CREDIT CARD</p>
      <div className="max-w-[900px] font-comfortaa">
        <div>
          <Label label="Card Holder Name" />
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="This is my full name"
            required
          />
        </div>
        <div className="mt-8">
          <Label label="Card Number" />
          <div className="flex relative">
            <input
              type="text"
              className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter card number"
              required
            />
            <CiCreditCard1 className="text-[20px] mr-2 absolute left-2 top-2.5" />{" "}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-8">
          <div>
           <Label label="Expiry Date" />
            <Datepicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
          <div>
            <Label label="CVV" />
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter 3 digits code"
              required
            />
          </div>
        </div>
        <div className="mt-8 flex items-center">
          <p className="font-unica text-[30px] py-5 mr-12">BILLING ADDRESS</p>
          <label className="flex items-center">
            <input
              type="checkbox"
              value=""
              className="mr-2 w-4 h-4 accent-[#A042E1]"
            />
            The same as primary shipping address
          </label>
        </div>

        <div className="mt-8">
          <Label label="Full Name" />
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="First Name and Last Name"
            required
          />
        </div>
        <div className="mt-8 grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <Label label="Address" />
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Street Name and Number"
              required
            />
          </div>
          <div>
            <Label label="Apt Suite" />
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter apt number"
            />
          </div>
        </div>
        <div className="mt-8 ">
          <Label label="City" />
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="City Name"
            required
          />
        </div>
        <div className="mt-8 grid grid-cols-3 gap-8">
          <div>
            <Label label="Country" />
            {/* <Select
              //className="flex-1"
              options={courtries}
              selectedOption={coutry}
              handelChange={(event) => setCountry(event)}
            /> */}
          </div>
          <div>
            <Label label="Province" />
            {/* <Select
              //className="flex-1"
              options={provinceArray}
              selectedOption={province}
              handelChange={(event) => setProvince(event)}
            /> */}
          </div>
          <div>
            <Label label="Zip Code" />
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter ZIP Code"
            />
          </div>
          <div className="mt-16">
            <button name="Save" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPaymentAdd;
