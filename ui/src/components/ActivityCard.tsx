import { Josefin_Sans } from "next/font/google";

import { Activity } from "../pages/api";

const josef = Josefin_Sans({ subsets: ["latin"] });

const ActivityCard = ({ activities }: { activities: Activity[] }) => {

  return (
    <div className="flex flex-wrap mt-12 gap-2 justify-center">
      {activities &&
        activities.map(
          (activity: any, index) =>
            activity && (
              <div
                key={index}
                className="max-w-sm p-6 bg-white dark:bg-violet border border-gray-200 rounded-lg dark:text-white shadow dark:bg-gray-800 dark:border-gray-700 m-5"
              >
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {activity.activityType}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray dark:text-gray-400">
                  {new Date(activity.startDate).toLocaleString()}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center py-2 text-sm font-medium text-center dark:text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  View Activity
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            )
        )}
    </div>
  );
};

export default ActivityCard;
