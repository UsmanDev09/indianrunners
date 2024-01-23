import { useContext, useEffect, useState } from "react";
import { Country, State, City }  from 'country-state-city';
import { Josefin_Sans } from "next/font/google";
import Cookies from "js-cookie";
import { useFormik } from 'formik';
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import axios from '../../api/index';

const josef = Josefin_Sans({ subsets: ["latin"] });


export const ProfileForm: React.FC<{}> = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [_, setSelectedCity] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    dob: new Date(),
    gender: "",
    weight: "",
    height: "",
    shippingDetail:{
      contact: "",
      address: "",
      state: "",
      city: "",
      country: ""
    }
    
  });
  
  const router = useRouter();
  const token = Cookies.get('token');
  const countries = Country.getAllCountries();

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    const states = State.getStatesOfCountry(countryCode);
    setSelectedState(null);
    setSelectedCity(null);
};

const handleStateChange = (stateCode: string) => {
    setSelectedState(stateCode);
    const cities = City.getCitiesOfState(selectedCountry!, stateCode);
    setSelectedCity(null);
};

const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
};

  let initialValues = {
    dob: profile.dob,
    gender: profile.gender,
    weight: profile.weight,
    height: profile.height,
      contact: profile.shippingDetail.contact,
      address: profile.shippingDetail.address,
      state: profile.shippingDetail.state,
      city: profile.shippingDetail.city,
      country: profile.shippingDetail.country
    
  };

  const fetchProfile = async () => {
    try {
      const {data: { data }} = await axios.get(`${process.env.SERVER_DOMAIN}/api/user/profile`);
      setProfile(data);

      initialValues = {
        dob: new Date(data.dob),
        gender: data.gender,
        weight: data.weight,
        height: data.height,
          contact: data.shippingDetail.contact,
          address: data.shippingDetail.address,
          state: data.shippingDetail.state,
          city: data.shippingDetail.city,
          country: data.shippingDetail.country
        
      };
      console.log(formik.values)
      // Set the form values
      formik.setValues(initialValues);

    } catch (error) {
      if(error instanceof Error) toast.error(error.message);
    }
  };

  
  useEffect(() => {
    fetchProfile();
  }, []);

  
  const formik = useFormik({
    initialValues,
    onSubmit: async values => {
      console.log('values', values)
      const {data: { success }} = await axios.put(`${process.env.SERVER_DOMAIN}/api/user/profile`, {
        dob: values.dob,
        gender: values.gender,
        weight: values.weight,
        height: values.height,
        contact: values.contact,
        address: values.address,
        state: values.state,
        city: values.city,
        country: values.country
      })

      
      if(success){
        toast.success('Profile updated successfully');
        router.replace('/profile')
      }
    },
  });
    console.log(formik.values)
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
                    value={String(formik.values.dob)}
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
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    placeholder="Address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  {/* <label
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
                  /> */}

                  <div>
                    <div>
                      <select className="mr-3 border-gray-400 text-gray-500 w-[350px] mb-4" name="country" onChange={(e) => { formik.handleChange(e), handleCountryChange(e.target.value) }} >
                          <option value="">{formik.values.country ? formik.values.country : 'Select Country'}</option>
                          {countries.map((country) => (
                          <option key={country.isoCode} value={country.isoCode}>
                              {country.name}
                          </option>
                          ))}
                      </select>
                      {formik.touched.country && formik.errors.country ? (
                          <div className="text-red-500 text-sm mt-1">{formik.errors.country}</div>
                      ) : null}
                    </div>
                      {(selectedCountry || formik.values.state) && (
                          <>
                              <select className="mr-3 border-gray-400 text-gray-500 mb-4" name="state" onChange={(e) => { formik.handleChange(e), handleStateChange(e.target.value)}} >
                                  <option value="">{formik.values.state ? formik.values.state : 'Select State'}</option>
                                  {State.getStatesOfCountry(selectedCountry!).map((state) => (
                                  <option key={state.isoCode} value={state.isoCode}>
                                      {state.name}
                                  </option>
                                  ))}
                              </select>
                          </>
                      )}
                      {(selectedState || formik.values.city) && (
                          <>
                              <select className=" border-gray-400 text-gray-500 mb-4" name="city" onChange={(e) => { formik.handleChange(e), handleCityChange(e.target.value) }} >
                                  <option value="">{formik.values.city ? formik.values.city : 'Select City'}</option>
                                  {City.getCitiesOfState(selectedCountry!, selectedState!).map((city) => (
                                  <option key={city.name} value={city.name}>
                                      {city.name}
                                  </option>
                                  ))}
                              </select>
                              {formik.touched.city && formik.errors.city ? (
                                  <div className="text-red-500 text-sm mt-1">{formik.errors.city}</div>
                              ) : null}
                          </>
                      )}
                  </div>
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
