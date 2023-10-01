import { GetServerSideProps } from "next";
import Image from "next/image";
import axios from "axios";

type Props = {
  notifications: {
    message: string;
    type: string;
    updatedAt: number;
  }[];
};

export default function Notifications({ notifications }: Props) {
  const onDeleteNotification = () => {
    // delete notifications
  };

  return (
    <div className="container mx-auto pt-20">
      {notifications &&
        notifications.map((notification, index) => {
          const date = new Date(notification.updatedAt);
          const currentTime = new Date();

          const timeDifference = currentTime.valueOf() - date.valueOf(); // This will give the difference in milliseconds

          // Convert milliseconds to a more human-readable format (e.g., hours, minutes, seconds)
          const totalMinutes = Math.floor(timeDifference / (1000 * 60));
          const days = Math.floor(totalMinutes / (60 * 24));
          const remainingMinutes = totalMinutes % (60 * 24);
          const hours = Math.floor(remainingMinutes / 60);
          const remainingMinutesAfterHours = remainingMinutes % 60;
          const minutes = Math.floor(remainingMinutesAfterHours);
          const seconds = Math.floor(
            (remainingMinutesAfterHours - minutes) * 60
          );

          return (
            <div key={index} className="flex bg-white shadow-lg mb-2">
              <div className="w-full rounded-lg sm:p-4 mt-2">
                <h5 className="mb-2 text-3xl font-bold text-gray-900">
                  {notification.type}
                </h5>
                <p className="mb-5 text-base text-gray-600 sm:text-md">
                  {notification.message}
                </p>
                <p className="text-xs text-pink">
                  {days > 0 && `${days} ${days === 1 ? "day" : "days"}`}
                  {hours > 0 && ` ${hours} ${hours === 1 ? "hour" : "hours"}`}
                  {minutes > 0 &&
                    ` ${minutes} ${minutes === 1 ? "minute" : "minutes"}`}
                  {seconds > 0 &&
                    ` ${seconds} ${seconds === 1 ? "seconds" : "seconds"}`}{" "}
                  ago
                </p>
              </div>
              <button
                type="button"
                onClick={onDeleteNotification}
                className="items-center justify-center flex rounded-lg p-1.5 hover:bg-gray-400 h-8 w-8"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          );
        })}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<any> = async ({
  params,
}) => {
  try {
    // Make an API call here
    const response = await axios.get("http://localhost:5000/api/notification"); // Replace with your API endpoint
    const { data } = response.data;

    return {
      props: {
        notifications: data, // Pass the data as 'notifications' prop, not 'data'
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        props: {
          errors: error.message,
        },
      };
    }
    return {
      props: {
        errors: "An unknown error occurred",
      },
    };
  }
};
