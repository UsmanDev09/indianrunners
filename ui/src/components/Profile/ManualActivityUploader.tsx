import { FormEvent, useState } from "react";
// import { Josefin_Sans } from "next/font/google";
import { Datepicker } from 'flowbite-react';

// const josef = Josefin_Sans({ subsets: ["latin"] });
const ManualActivityUploader = () => {
    const [formData, setFormData] = useState({
        activityType: '',
        startDate: new Date(),
        elapsedTime: '',
        movingTime: '',
        distanceCovered: '',
        averageSpeed: '',
        averageMovingSpeed: '',
        maximumSpeed: '',
        totalAssent: '',
    })

    const handleStartDate = (selectedDate: Date) => {
		setFormData({...formData, startDate: selectedDate})
	}

    const handleInputChange = (e: React.ChangeEvent<EventTarget & (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)>) => {
        const { name, value } = e.target;
        
        setFormData({ ...formData, [name]: value });
    }

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        fetch(`${process.env.SERVER_DOMAIN}/api/activity/manual`, {
            method: "POST",
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
    }

    return (
        <div className="flex w-full">
            <form
                className="flex flex-col bg-white dark:bg-dark-green rounded justify-start w-full"
                onSubmit={submitForm} 
            >
                <section className="dark:bg-dark-green w-full mt-10">
                    <div className="flex flex-col px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-700 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Upload Activity
                                </h1>
                                <div>
                                    <label
                                        id="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Activity Type
                                    </label>
                                    <div>
                                        <label htmlFor="naactivityTypeme" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sport</label>
                                        <select id="activityType" name="activityType" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected>Choose a Sport</option>
                                            <option value="Run">Run</option>
                                            <option value="VirtualRun">Virtual Run</option>
                                            <option value="TrailRun">Trail Run</option>
                                            <option value="Treadmil">Treadmil</option>
                                            <option value="Walk">Walk</option>
                                            <option value="Hike">Hike</option>
                                            <option value="Ride">Ride</option>
                                            <option value="MountainBikeRide">Mountain Bike Ride</option>
                                            <option value="GravelBikeRide">Gravel Bike Ride</option>
                                            <option value="VeloMobile">Velo Mobile</option>
                                            <option value="VirtialRide">Virtual Ride</option>
                                            <option value="Handcycle">Hand Cycle</option>
                                            <option value="Swim">Swim</option>
                                            <option value="Crossfit">Cross Fit</option>
                                            <option value="Elliptical">Elliptical</option>
                                            <option value="StairStepper">Stair Stepper</option>
                                            <option value="WeightTraining">Weight Training</option>
                                            <option value="Workout">Workout</option>
                                            <option value="Hiit">Hiit</option>
                                            <option value="Pilates">Pilates</option>
                                            <option value="Yoga">Yoga</option>
                                            </select>
                                    </div> 
                                </div> 
                                
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start date</label>
                                    <Datepicker onSelectedDateChanged={handleStartDate} />
                                </div>

                                <div>
                                    <label htmlFor="elapsedTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Elapsed Time</label>
                                    <input type="number" name="elapsedTime" onChange={handleInputChange} id="elapsedTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="20" required />
                                </div>

                                <div>
                                    <label htmlFor="movingTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Moving Time</label>
                                    <input type="number" name="movingTime" onChange={handleInputChange} id="movingTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="20" required />
                                </div>

                                <div>
                                    <label htmlFor="distanceCovered" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Distance Covered</label>
                                    <input type="number" name="distanceCovered" onChange={handleInputChange} id="distanceCovered" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="20" required />
                                </div>

                                <div>
                                    <label htmlFor="averageSpeed" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Average Speed</label>
                                    <input type="number" name="averageSpeed" onChange={handleInputChange} id="averageSpeed" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="20" required />
                                </div>

                                <div>
                                    <label htmlFor="maximumSpeed" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maximum Speed</label>
                                    <input type="number" name="maximumSpeed" onChange={handleInputChange} id="maximumSpeed" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="20" required />
                                </div>

                                <div>
                                    <label htmlFor="totalAssent" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Assent</label>
                                    <input type="number" name="totalAssent" onChange={handleInputChange} id="totalAssent" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="20" required />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
                                >
                                    Submit Activity
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    )
}

export default ManualActivityUploader;