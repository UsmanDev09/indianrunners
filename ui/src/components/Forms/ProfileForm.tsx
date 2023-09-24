import { useContext, useState } from "react";

import { Josefin_Sans } from "next/font/google";

const josef = Josefin_Sans({ subsets: ["latin"] });

import React from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import { useRouter } from "next/router";
import setAccount from "@/lib/setAccount";
import { MyGlobalContext } from "@/Hooks/useGlobalContext";

// Shape of form values
interface ProfileFormValues {
  dob: string;
  gender: string;
  weight: string;
  height: string;
  contact: string;
  country: string;
  state: string;
  city: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
export const ProfileForm: React.FC<{}> = () => {
  const initialValues: ProfileFormValues = {
    dob: "",
    gender: "",
    weight: "",
    height: "",
    contact: "",
    country: "",
    state: "",
    city: "",
  };
  const router = useRouter();
  const { state, dispatch } = useContext(MyGlobalContext);
  return (
    <div className={` place-content-center ${josef.className} `}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          console.log({ values, actions });
          const token = localStorage.getItem("token");
          await fetch("http://localhost:5000/api/user/profile", {
            method: "PUT",
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit

            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${token}`,
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
            body: JSON.stringify(values),
          })
            .then(function(res) {
              return res.json();
            })
            .then(function(data) {
              if (data?.success) {
                dispatch({
                  type: "ACCOUNT_UPDATE",
                  payload: {
                    firstName: localStorage.getItem("firstName"),
                    lastName: localStorage.getItem("lastName"),
                    userName: localStorage.getItem("userName"),
                    profile: data?.data,
                    token: localStorage.getItem("token"),
                    email: localStorage.getItem("email"),
                    role: localStorage.getItem("role"),
                  },
                });
                setAccount(
                  state.account.firstName,
                  state.account.lastName,
                  state.account.userName,
                  state.account.profile,
                  state.account.token,
                  state.account.email,
                  state.account.role
                );
                router.replace("/profile");
              }

              if (data?.success) {
                router.replace("/profile");
              }
            });
          console.log(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form className="flex flex-col items-center bg-prod rounded justify-center h-screen w-screen dark:bg-dark-green">
          <section className="bg-gray-50 dark:bg-gray-900 w-1/2 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full bg-white dark:bg-violet  drop-shadow-md rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y md:space-y-2 sm:px-8 ">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Complete Your Profile
                  </h1>
                  <label
                    htmlFor="dob"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date of Birth
                  </label>
                  <Field
                    id="dob"
                    name="dob"
                    type="date"
                    placeholder="Date of Birth"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gender
                  </label>
                  <Field
                    id="gender"
                    name="gender"
                    placeholder="Gender"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <label
                    htmlFor="weight"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Weight
                  </label>
                  <Field
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="Weight"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <label
                    htmlFor="height"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Height
                  </label>
                  <Field
                    id="height"
                    name="height"
                    type="number"
                    placeholder="Height"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <label
                    htmlFor="contact"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact
                  </label>
                  <Field
                    id="contact"
                    name="contact"
                    type="tel"
                    placeholder="Contact"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Country
                  </label>
                  <Field
                    id="country"
                    name="country"
                    placeholder="Country"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <label
                    htmlFor="state"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    State
                  </label>
                  <Field
                    id="state"
                    name="state"
                    placeholder="State"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City
                  </label>
                  <Field
                    id="city"
                    name="city"
                    placeholder="City"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <button
                    type="submit"
                    className="w-full mt-2 text-white bg-gray hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </section>
        </Form>
      </Formik>
    </div>
  );
};
