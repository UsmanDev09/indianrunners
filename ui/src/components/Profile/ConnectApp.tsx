import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useEffect } from "react";

const ConnectApp = () => {
  const router = useRouter();
  const { code } = router.query;
  const token = localStorage.getItem("token");
  console.log(code);
  useEffect(() => {
    console.log("fetching");
    try {
      if (code) {
        console.log(code);
        fetch("http://localhost:5000/api/activity", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify({
            code,
          }),
        }).then((activities) => console.log(activities));
      }
    } catch (err) {
      if (err instanceof Error) console.error(err);
    }
  }, [code]);

  return (
    <div className="w-full h-auto ml-8  mt-8 max-w-sm p-4 rounded-lg  sm:p-6  dark:border-gray-700 dark:text-white">
      <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
        Connect Apps
      </h5>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Connect with one of our available wallet providers or create a new one.
      </p>
      <ul className="my-4 space-y-3">
        <li>
          <Link
            href="https://www.strava.com/oauth/authorize?client_id=113257&response_type=code&redirect_uri=http://localhost:3000/profile/apps/exchange_token&approval_prompt=force&scope=activity:read_all"
            className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
          >
            <button className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-lg xl:mb-0 mb-2">
              <Image src="/strava.png" alt="Strava" width={40} height={40} />
            </button>
            <span className="flex-1 ml-3 whitespace-nowrap">Strava</span>
          </Link>
        </li>
      </ul>
      <div>
        <a
          href="#"
          className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
        >
          <svg
            className="w-3 h-3 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Why do I need to connect with my wallet?
        </a>
      </div>
    </div>
  );
};

export default ConnectApp;
