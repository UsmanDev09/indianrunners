import { Badge, BadgeCriteria } from "../../pages/api";
import { Datepicker } from "flowbite-react";
import { FormEvent, useState } from "react";
import React from "react";

const CreateBadge = ({
  setBadges,
  setOpenCreateBadgeDrawer,
  openCreateBadgeDrawer,
}: {
  setBadges: (badge: Badge[]) => void;
  setOpenCreateBadgeDrawer: (action: boolean) => void;
  openCreateBadgeDrawer: boolean;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    activity: "",
    distance: "",
    consecutiveDays: "",
    specificDays: new Date(),
    numberOfActivities: "",
    category: "",
  });

  console.log(formData);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<
      EventTarget & (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
    >
  ) => {
    const { name, value } = e.target;
    // if (name === "categories") {
    //   categories.forEach((category) => {
    //     if (category._id === parseInt(value))
    //       setSelectedCategories([...selectedCategories, category]);
    //   });
    //   console.log(selectedCategories);
    //   setFormData({ ...formData, categories: [...formData.categories, value] });
    // } else {
    //   setFormData({ ...formData, [name]: value });
    // }

    setFormData({ ...formData, [name]: value });
  };

  //   const handleRemoveSelectedCategory = (
  //     categoryIdToRemove: number | string | undefined
  //   ) => {
  //     const categories = selectedCategories.filter(
  //       (category) => category._id !== categoryIdToRemove
  //     );
  //     const formDataCategoryIds = formData.categories.filter(
  //       (categoryId) => categoryId === categoryIdToRemove
  //     );
  //     setFormData({ ...formData, categories: formDataCategoryIds });

  //     setSelectedCategories(categories);
  //   };

  //   const handleStartDate = (selectedDate: Date) => {
  //     setFormData({ ...formData, startDate: selectedDate });
  //   };

  //   const handleEndDate = (selectedDate: Date) => {
  //     setFormData({ ...formData, endDate: selectedDate });
  //   };

  //   const handleIsKnockoutToggleChecked = () => {
  //     setIsKnockoutToggleChecked(!isKnockoutToggleChecked);
  //     setFormData({ ...formData, knockout: true });
  //   };

  //   const handleIsVerifiedToggleChecked = () => {
  //     setIsVerifiedToggleChecked(!isVerifiedToggleChecked);
  //     setFormData({ ...formData, verified: true });
  //   };

  //   const handleIsFeaturedToggleChecked = () => {
  //     setIsFeaturedToggleChecked(!isFeaturedToggleChecked);
  //     setFormData({ ...formData, featured: true });
  //   };

  const removeEmptyValues = (data: any) => {
    let newData: any = {};
    Object.keys(data).forEach((key) => {
      if (data[key] !== "") {
        newData[key] = data[key];
      }
    });
    return newData;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const cookieHeader = document.cookie;
    const tokenRegex = /token=([^;]*)/;
    let token = "";
    if (cookieHeader) {
      const tokenMatch = cookieHeader.match(tokenRegex);
      if (tokenMatch && tokenMatch.length > 1) {
        token = tokenMatch[1];
      }
    }
    const filteredFormData = removeEmptyValues(formData);

    try {
      const response = await fetch("/api/createBadge", {
        method: "POST",
        body: JSON.stringify(filteredFormData),
        headers: {
          Authorization: `${token}`,
        },
      });

      const Badges = await response.json();

      if (response.ok) {
        setBadges(Badges);
        setOpenCreateBadgeDrawer(false);
      } else {
        console.error("Failed to create Badge");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        console.error("Error creating Badge:", error.message);
      }
    }
  };

  return (
    <div
      id="drawer-create-Badge-default"
      className={`fixed right-0 z-40 ${
        openCreateBadgeDrawer ? "block" : "hidden"
      } mt-10 w-full  h-[1200px] max-w-xs overflow-y-auto  p-4 bg-white dark:bg-gray-800`}
    >
      <h5
        id="drawer-label"
        className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        New Badge
      </h5>
      <button
        onClick={() => setOpenCreateBadgeDrawer(!openCreateBadgeDrawer)}
        type="button"
        data-drawer-dismiss="drawer-update-product-default"
        aria-controls="drawer-update-product-default"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <form action="#" encType="multipart/form-data" className=" h-full mb-32">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type Badge name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type Badge description"
              required
            />
          </div>

          <div>
            <label
              htmlFor="activity"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Activity
            </label>
            <select
              id="activity"
              name="activity"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a Sport</option>
              <option value="run">Run</option>
              <option value="virtualRun">Virtual Run</option>
              <option value="trailRun">Trail Run</option>
              <option value="treadmil">Treadmil</option>
              <option value="walk">Walk</option>
              <option value="hike">Hike</option>
              <option value="ride">Ride</option>
              <option value="mountainBikeRide">Mountain Bike Ride</option>
              <option value="gravelBikeRide">Gravel Bike Ride</option>
              <option value="veloMobile">Velo Mobile</option>
              <option value="virtialRide">Virtual Ride</option>
              <option value="handcycle">Hand Cycle</option>
              <option value="swim">Swim</option>
              <option value="crossfit">Cross Fit</option>
              <option value="elliptical">Elliptical</option>
              <option value="stairStepper">Stair Stepper</option>
              <option value="weightTraining">Weight Training</option>
              <option value="workout">Workout</option>
              <option value="hiit">Hiit</option>
              <option value="pilates">Pilates</option>
              <option value="yoga">Yoga</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="distance"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Distance
            </label>
            <input
              type="distance"
              name="distance"
              onChange={handleInputChange}
              id="distance"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="20"
              required
            />
          </div>

          <div>
            <label
              htmlFor="consecutiveDays"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Consecutive Days
            </label>
            <input
              type="consecutiveDays"
              name="consecutiveDays"
              onChange={handleInputChange}
              id="consecutiveDays"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="20"
              required
            />
          </div>

          <div>
            <label
              htmlFor="specificDays"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Specific Days
            </label>
            <Datepicker
              name="specificDays"
              onChange={handleInputChange}
              id="specificDays"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="20"
              required
            />
          </div>

          <div>
            <label
              htmlFor="numberOfActivities"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Number of Activities
            </label>
            <input
              type="numberOfActivities"
              name="numberOfActivities"
              onChange={handleInputChange}
              id="numberOfActivities"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="20"
              required
            />
          </div>

          <div>
            <label
              htmlFor="activity"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Activity
            </label>
            <select
              id="category"
              name="category"
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a Category</option>
              <option value="Single Activity">Single Activity</option>
              <option value="Special Achievement">Special Achievement</option>
              <option value="Challenge">Challenge</option>
              <option value="Total Distance">Total Distance</option>
              <option value="Multiple Activities">Multiple Activities</option>
            </select>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="text-white w-40 justify-center bg-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Add Badge
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBadge;
