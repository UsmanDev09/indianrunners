import Link from "next/link";
import { useRouter } from "next/router";

import * as path from "../../constants/paths";

const SideBar = () => {
  const router = useRouter();

  const checkPath = (path: any) => {
    return path === `${path.PROFILE}`
      ? router.pathname === `${path.PROFILE}` ||
        router.pathname === `${path.PROFILE}/NewProduct`
        ? true
        : false
      : router.pathname.includes(path)
      ? true
      : false;
  };

  const profileArray = [
    {
     
      name: "Account Information",
      path: `${path.PROFILE}`,
    },
    {
      name: "Connected Apps",
      path: `${path.PROFILE}/apps/exchange_token`,
    },
    {
      name: "Activities",
      path: `${path.PROFILE}/activities`,
    },
    {
      name: "Certificates",
      path: `${path.PROFILE}/certificates`,
    },
    {
      name: "Leaderboard",
      path: `${path.PROFILE}/leaderboard`,
    },
    {
      name: "Upload Activity",
      path: `${path.PROFILE}/manual-activity`,
    },
  ];
  return (
    <div
      className="w-full md:w-80 mr-32 mt-12 bg-gray-200 p-10 dark:text-white dark:bg-gray-700 "
      aria-label="Sidebar"
    >
      <div className="xs:overflow-y-auto md:overflow-y-clip xl:overflow-y-auto md:w-auto py-4 ">
        <ul className="space-y-2 dark:text-white">
          <li className="flex items-center border-b-2  border-black pb-3 
          ">
            <Link href={`${path.HOMEPAGE}`} className="font-comfortaa">
              Home
            </Link>
            &nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="11"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              imageRendering="optimizeQuality"
              fillRule="evenodd"
              clipRule="evenodd"
              viewBox="0 0 298 511.93"
            >
              <path
                fillRule="nonzero"
                d="M70.77 499.85c-16.24 16.17-42.53 16.09-58.69-.15-16.17-16.25-16.09-42.54.15-58.7l185.5-185.03L12.23 70.93c-16.24-16.16-16.32-42.45-.15-58.7 16.16-16.24 42.45-16.32 58.69-.15l215.15 214.61c16.17 16.25 16.09 42.54-.15 58.7l-215 214.46z"
              />
            </svg>
            &nbsp;
            <Link href={`${path.PROFILE}`} className="font-comfortaa">
              Profile
            </Link>
          </li>
          <li className="font-unica text-2xl pt-2">PROFILE</li>
          <div className="flex md:flex-col sm:flex-row overflow-auto scrollbar ">
            {profileArray.map((ele, index) => {
              let flag = checkPath(ele.path);

              return (
                <li key={index} className="mt-2 ">
                  <Link
                    href={ele.path}
                    className="flex items-center p-2 xs:bg-gray-100 xs:ml-2 xl:ml-0 dark:bg-dark-button dark:hover:bg-dark text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark: text-white"
                  >
                    <span className={"flex-1 whitespace-nowrap "}>
                      {ele.name}
                    </span>
                    <svg
                      className={flag ? "inline-block" : "hidden"}
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="11"
                      shapeRendering="geometricPrecision"
                      textRendering="geometricPrecision"
                      imageRendering="optimizeQuality"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      viewBox="0 0 298 511.93"
                    >
                      <path
                        fillRule="nonzero"
                        d="M70.77 499.85c-16.24 16.17-42.53 16.09-58.69-.15-16.17-16.25-16.09-42.54.15-58.7l185.5-185.03L12.23 70.93c-16.24-16.16-16.32-42.45-.15-58.7 16.16-16.24 42.45-16.32 58.69-.15l215.15 214.61c16.17 16.25 16.09 42.54-.15 58.7l-215 214.46z"
                      />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
