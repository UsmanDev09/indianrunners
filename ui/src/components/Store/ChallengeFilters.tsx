import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ChallengeFilters = ({ setChallenges }: { setChallenges: Function }) => {
  const [name, setName] = useState("");
  const [ctype, setcType] = useState("");
  const [activity, setactivity] = useState("");
  const [knockout, setknockout] = useState("");
  const [ktype, setktype] = useState("");
  const [featured, setfeatured] = useState("");
  const [verified, setverified] = useState("");
  const [minprice, setminprice] = useState("");
  const [maxprice, setmaxprice] = useState("");

  const filterChallenges = () => {
    const token = Cookies.get("token");
    const params = {
      name: name,
      type: ctype,
      activity: activity,
      knockout: knockout,
      knockoutType: ktype,
      featured: featured,
      verified: verified,
      minPrice: minprice,
      maxPrice: maxprice,
    };
    const fetchChallenges = async () => {
      const chall = fetch(
        `${process.env.SERVER_DOMAIN}/api/challenge?${new URLSearchParams(
          params
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ).then((response) => {
        response.json().then((chall) => {
          console.log("chall", chall), setChallenges(chall.data);
        });
      });
    };
    fetchChallenges();
  };

  useEffect(() => {
    filterChallenges();
  }, [
    name,
    ctype,
    activity,
    knockout,
    ktype,
    featured,
    verified,
    minprice,
    maxprice,
  ]);
  return (
    <div className="dark:bg-white rounded w-0 sm:w-max z-50">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={() => {
          document
            .getElementById("default-sidebar")
            ?.classList.toggle("-translate-x-full");
        }}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="w-64 shadow-2xl rounded-md h-full transition-transform -translate-x-full sm:translate-x-0 bg-white"
        aria-label="Sidebar"
      >
        <div className="h-full p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className=" dark:text-gray-200 font-semibold text-center text-4xl p-4">
            Filters
          </div>

          <ul className="space-y-2 font-medium">
            <li>
              <div className="dark:text-gray-200 text-center m-3 text-lg">
                Sort by Name
              </div>
              <div className="flex items-center mb-4">
                <input
                  onClick={() => setName("asc")}
                  id="default-Name-1"
                  type="radio"
                  value=""
                  name="default-Name"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-base font-medium text-gray-900 dark:text-gray-200">
                  Ascending
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onClick={() => setName("desc")}
                  id="default-Name-2"
                  type="radio"
                  value=""
                  name="default-Name"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-base font-medium text-gray-900 dark:text-gray-200">
                  Descending
                </label>
              </div>
            </li>
            <li>
              <div className="dark:text-gray-200 text-lg text-center m-4">
                Type
              </div>
              <div className="flex items-center mb-4">
                <input
                  onClick={() => setcType("open")}
                  id="default-type-1"
                  type="radio"
                  value=""
                  name="default-type"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-base font-medium text-gray-900 dark:text-gray-200">
                  Open
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onClick={() => setcType("fixed")}
                  id="default-type-2"
                  type="radio"
                  value=""
                  name="default-type"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-base font-medium text-gray-900 dark:text-gray-200">
                  Fixed
                </label>
              </div>
            </li>
            <li className="pt-8">
              <div className="dark:text-gray-200 text-lg text-center mb-4">
                Activity
              </div>
              <div className="flex items-center mb-4">
                <input
                  onClick={() => setactivity("single")}
                  id="default-activity-1"
                  type="radio"
                  value=""
                  name="default-activity"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-base font-medium text-gray-900 dark:text-gray-200">
                  Single
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onClick={() => setactivity("multiple")}
                  id="default-activity-2"
                  type="radio"
                  value=""
                  name="default-activity"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-base font-medium text-gray-900 dark:text-gray-200">
                  Multiple
                </label>
              </div>
            </li>
            <li className="pt-8">
              <div className="dark:text-gray-200 text-center text-lg mb-4">
                Knockout
              </div>
              <div className="flex items-center mb-4 ">
                <input
                  onClick={() =>
                    knockout == ""
                      ? setknockout("true")
                      : knockout == "true"
                      ? setknockout("")
                      : setknockout("true")
                  }
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                  Enable Knockout
                </label>
              </div>
            </li>
            <li>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center pr-2">
                  <input
                    onClick={() => setktype("single")}
                    id="default-knockout-1"
                    type="radio"
                    value=""
                    name="default-knockout"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-base font-medium text-gray-900 dark:text-gray-200">
                    Single
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onClick={() => setktype("multiple")}
                    id="default-knockout-2"
                    type="radio"
                    value=""
                    name="default-knockout"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-base font-medium text-gray-900 dark:text-gray-200">
                    Multiple
                  </label>
                </div>
              </div>
            </li>
            <li className="pt-8">
              <div className="dark:text-gray-200 text-lg text-center pt-2">
                Other checks
              </div>
              <div className="">
                <div className="flex items-center mt-4">
                  <input
                    onClick={() =>
                      verified == "false"
                        ? setverified("true")
                        : verified == "true"
                        ? setverified("")
                        : setverified("true")
                    }
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-base font-medium text-gray-900 dark:text-gray-200">
                    Verified
                  </label>
                </div>
                <div className="flex items-center mt-4 ">
                  <input
                    onClick={() =>
                      featured == "false"
                        ? setfeatured("true")
                        : featured == "true"
                        ? setfeatured("")
                        : setfeatured("true")
                    }
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-base font-medium text-gray-900 dark:text-gray-200">
                    Featured
                  </label>
                </div>
              </div>
            </li>
            <li className="pt-8">
              <label className="block mb-2 text-center font-semibold  dark:text-gray-200 text-lg">
                Min-max range
              </label>
              <p className="dark:text-gray-200 text-base">
                Minimum Price: {minprice}
              </p>
              <input
                id="minimum"
                type="range"
                min="0"
                max="10000"
                onChange={(e) => {
                  setminprice(e.target.value);
                }}
                className="my-1 p-[9px] w-full h-1 accent-green bg-pink rounded-full border-black border cursor-pointer"
              />
              <p className="dark:text-gray-200 text-base">
                Maximum Price: {maxprice}
              </p>
              <input
                id="maximum"
                type="range"
                min="0"
                max="10000"
                onChange={(e) => {
                  setmaxprice(e.target.value);
                }}
                className="my-1 p-[9px] w-full h-1 accent-green bg-pink rounded-full border-black border cursor-pointer"
              />
            </li>
            <li className="pt-12">
              <button
                className="text-black dark:text-white rounded bg-pink w-full text-2xl hover:underline"
                onClick={filterChallenges}
              >
                Apply Filters
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default ChallengeFilters;
