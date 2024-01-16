import { useContext, useEffect, useState } from "react";

import { Josefin_Sans } from "next/font/google";
import Cookies from "js-cookie";
import { useFormik } from 'formik';
import { useRouter } from "next/router";

import axios from '../../api/index';
import toast from "react-hot-toast";

const josef = Josefin_Sans({ subsets: ["latin"] });

export const ProfileForm: React.FC<{}> = () => {
  const [profile, setProfile] = useState({
    dob: new Date(),
    gender: "",
    weight: 0,
    height: 0,
    contact: 0,
    country: "",
    state: "",
    city: "",
  });
  
  const router = useRouter();
  const token = Cookies.get('token');

  let initialValues = {
    dob: profile.dob,
    gender: profile.gender,
    weight: profile.weight,
    height: profile.height,
    contact: profile.contact,
    country: profile.country,
    state: profile.state,
    city: profile.city,
  };

  const fetchProfile = async () => {
    try {
      const {data: { data }} = await axios.get(`${process.env.SERVER_DOMAIN}/api/user/profile`);
      setProfile(data);

      // Update initialValues with the received profile data
      initialValues = {
        dob: new Date(data.dob),
        gender: data.gender,
        weight: data.weight,
        height: data.height,
        contact: data.contact,
        country: data.country,
        state: data.state,
        city: data.city,
      };

      // Set the form values
      formik.setValues(initialValues);

    } catch (error) {
      if(error instanceof Error) toast.error('Error fetching profile:', error);
    }
  };

  
  useEffect(() => {
    fetchProfile();
  }, []);

  
  const formik = useFormik({
    initialValues,
    onSubmit: async values => {

      const {data: { success }} = await axios.put(`${process.env.SERVER_DOMAIN}/api/user/profile`, {
        dob: values.dob,
        gender: values.gender,
        weight: values.weight,
        height: values.height,
        contact: values.contact,
        country: values.country,
        state: values.state,
        city: values.city,

      })

      
      if(success){
        toast.success('Profile updated successfully');
        router.replace('/profile')
      }
    },
  });
  
  return (
    <div className={`place-content-center ${josef.className} `}>
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center bg-prod rounded justify-center h-screen w-screen dark:bg-dark-green">
          <section className="bg-gray-50 dark:bg-gray-900 sm:w-1/2 ">
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
                  <input
                    name="dob"
                    type="date"
                    placeholder="Date of Birth"
                    onChange={formik.handleChange}
                    value={formik.values.dob}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gender
                  </label>
                  <input
                    id="gender"
                    name="gender"
                    placeholder="Gender"
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <label
                    htmlFor="weight"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Weight
                  </label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="Weight"
                    onChange={formik.handleChange}
                    value={formik.values.weight}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <label
                    htmlFor="height"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Height
                  </label>
                  <input
                    id="height"
                    name="height"
                    type="number"
                    placeholder="Height"
                    onChange={formik.handleChange}
                    value={formik.values.height}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <label
                    htmlFor="contact"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="tel"
                    placeholder="Contact"
                    onChange={formik.handleChange}
                    value={formik.values.contact}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    placeholder="Country"
                    onChange={formik.handleChange}
                    value={formik.values.country}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <label
                    htmlFor="state"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    placeholder="State"
                    onChange={formik.handleChange}
                    value={formik.values.state}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    placeholder="City"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <button
                    type="submit"
                    className="w-full mt-2 text-white bg-gray-300 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </section>
        </form>
    </div>
  );
};
