// External Dependencies
import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
const Select = ({ options, onChange, selectedOption}) => {
  return (
    <Listbox
      as="div"
      value={selectedOption}
      onChange={(event) => {
        onChange(event);
      }}
    >
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <span className="inline-block w-full rounded-md shadow-sm">
              <Listbox.Button className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left  transition ease-in-out duration-150">
                <span className="block truncate">{selectedOption?.label}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                  <BiChevronDown />
                </span>
              </Listbox.Button>
            </span>
            <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg mb-11">
              <Transition
                show={open}
                leave="transition duration-100 ease-in"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0"
              >
                <Listbox.Options
                  static
                  className="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {options && options.map((option, index) => {
                    return (
                      <Listbox.Option
                        as={React.Fragment}
                        key={index}
                        value={option}
                        disabled={option.unavailable}
                      >
                        {(ele) => {
                          return (
                            <li
                              className={`${
                                ele?.active
                                  ? "text-gray-900 bg-gray-300"
                                  : "text-gray-900"
                              } cursor-default select-none relative py-2 pl-3 pr-9`}
                            >
                              <div className="flex items-center">
                                <span></span>
                                <span
                                  className={`flex items-center truncate`}
                                >
                                  {option.label}
                                </span>
                              </div>
                            </li>
                          );
                        }}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;
