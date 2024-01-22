import { Josefin_Sans } from "next/font/google";
import Image from "next/image";

import { Activity } from "../pages/api";
import verifiedImage from '/verified.png'

const josef = Josefin_Sans({ subsets: ["latin"] });

const ActivityCard = ({ activities }: { activities: Activity[] }) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };
  return (
    <div className={`${josef.className} flex flex-wrap mt-12 gap-2 justify-center`}>
      {activities &&
        activities.map(
          (activity: any, index) =>
            activity && (
              <div
                key={index}
                className="max-w-sm flex justify-between w-[350px] h-[250px] p-6 bg-white border border-gray-200 rounded-lg dark:text-white shadow dark:bg-gray-700 dark:border-gray-700 m-5"
              >
                <div>
                  <h5 className="text-2xl font-bold tracking-tight dark:text-white">
                    {activity.activityType}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {new Intl.DateTimeFormat('en-US', options).format(new Date(activity.startDate))}
                  </p>
                  <div className="flex gap-4 flex-nowrap">
                    <div className="border-r  pr-2">
                      <h3> Distance </h3>
                      <p>{activity.distanceCovered}</p>
                    </div>
                    <div className="border-r  pr-2">
                      <h3> Ascent </h3>
                      <p>{activity.totalAssent}</p>
                    </div>
                    <div className="border-r  pr-2">
                      <h3> Time </h3>
                      <p>{activity.movingTime}</p>
                    </div>
                  </div>
                <div className="mt-5">
                  {activity.app ? 
                    <p> Manual </p> : 
                    <Image src='/strava.png' width={50} height={50} alt='strava' />
                  }
                </div>
                </div>
                <div> 
                  <Image 
                    src={activity.status === 'rejected' ? '/rejected.png' : activity.status === 'pending' ? '/pending.png' : '/verified.png '}
                    width={32} 
                    height={32} 
                    alt='verified icon' 
                    data-tooltip-target="tooltip-default"
                  />
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default ActivityCard;
