import { useState, useEffect } from "react";
import { Country, State, City }  from 'country-state-city';
import { useFormik } from 'formik';

import { User } from "@/types";

export const ContactInformation = ( { userProfile, setShouldProcessPayment, processPayment } : { userProfile: User | undefined, setShouldProcessPayment: (arg0: boolean) => void, processPayment: (values: any) => void }) => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [_, setSelectedCity] = useState<string | null>(null);
  
    const handleSubmit = (values: any) => {
        setShouldProcessPayment(true);
        processPayment(values);
    }

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

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            contact: '',
            country: '',
            state: '',
            city: '',
            address: ''
        },
        onSubmit: async values => {
            handleSubmit(values);
        },
        validate: values => {
            const errors: any = {};

            if (!values.contact) {
                errors.contact = 'Contact is required';
            }

            if (!values.country) {
                errors.country = 'Country is required';
            }

            if (!values.address) {
                errors.address = 'Address is required';
            }

            if(!values.state) {
                errors.state = 'State is required';
            }

            return errors;
        },
    });

    useEffect(() => {
        if (userProfile) {
            formik.setValues({
                name: userProfile.name || '',
                email: userProfile.email || '',
                contact: '',
                country: '',
                state: '',
                city: '',
                address: ''
            });
        }
    }, [userProfile]);

    return (     
        <form onSubmit={formik.handleSubmit} className="w-1/2 pr-10">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" id="name" name="name" onChange={formik.handleChange}  value={(formik.values.name)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled/>
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="text" id="email" name="email" onChange={formik.handleChange}  value={String(formik.values.email)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled/>
                </div>  
                <div>
                    <div>
                        <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact</label>
                        <input type="tel" name="contact" onChange={formik.handleChange}  onBlur={formik.handleBlur} value={String(formik.values.contact)} id="contact" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {formik.touched.contact && formik.errors.contact ? (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.contact}</p>
                    ) : null}
                </div>
            </div>
            <div className="mb-4">
                <div>
                    <select className="mr-3 border-gray-400 text-gray-500 w-[350px]" name="country" onChange={(e) => { formik.handleChange(e), handleCountryChange(e.target.value) }} onBlur={formik.handleBlur}>
                        <option value="">Select Country</option>
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
                {selectedCountry && (
                    <>
                        <select className="mr-3 border-gray-400 text-gray-500" name="state" onChange={(e) => { formik.handleChange(e), handleStateChange(e.target.value)}} onBlur={formik.handleBlur}>
                            <option value="">Select State</option>
                            {State.getStatesOfCountry(selectedCountry).map((state) => (
                            <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                            </option>
                            ))}
                        </select>
                    </>
                )}
                {selectedState && (
                    <>
                        <select className=" border-gray-400 text-gray-500 mb-4" name="city" onChange={(e) => { formik.handleChange(e), handleCityChange(e.target.value) }} onBlur={formik.handleBlur}>
                            <option value="">Select City</option>
                            {City.getCitiesOfState(selectedCountry!, selectedState).map((city) => (
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
            
            <div>
                <div className="mb-6">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <input type="text" id="address" name="address" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div> 
                {formik.touched.address && formik.errors.address ? (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
                ) : null}
            </div>
            
            <button type="submit" disabled={Object.keys(formik.errors).length > 0} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pay Now</button>
            {Object.keys(formik.touched).length > 0 && Object.keys(formik.errors).length > 0 && <p className="text-red-500 text-sm mt-1">Please fill all fields</p>}
            <h1>EMPTY CART, COMPLETE PROFILE</h1>
        </form>
    )
}
