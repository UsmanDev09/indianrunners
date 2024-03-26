import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronRight } from "lucide-react";

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
      className="w-full md:w-80 mr-32 mt-12 bg-gray-200 p-10 dark:bg-gray-700"
      aria-label="Sidebar"
    >
      <div className="xs:overflow-y-auto md:overflow-y-clip xl:overflow-y-auto md:w-auto py-4">
        <ul className="space-y-2 dark:text-blue-text">
          <li className="flex items-center border-b-[1px] border-black dark:border-white pb-3">
            <Link href={`${path.HOMEPAGE}`} className="font-comfortaa ">
              Home
            </Link>
            <ChevronRight className="mx-1 h-6 w-5" />
            <Link href={`${path.PROFILE}`} className="font-comfortaa">
              Profile
            </Link>
          </li>
          <li className="font-unica text-2xl pt-2">PROFILE</li>
          <div className="flex md:flex-col sm:flex-row overflow-auto scrollbar">
            {profileArray.map((ele, index) => {
              let flag = checkPath(ele.path);

              return (
                <li key={index} className="mt-2">
                  <Link
                    href={ele.path}
                    className="flex items-center p-2 xs:bg-gray-100 xs:ml-2 xl:ml-0 dark:bg-dark-button dark:hover:bg-gray text-base font-norma text-dark-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700 "
                  >
                    <span className={"flex-1 whitespace-nowrap "}>
                      {ele.name}
                    </span>
                    <ChevronRight
                      className={flag ? "ml-1 inline-block" : "hidden"}
                    />
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

// className={flag ? "ml-1 inline-block" : "hidden"}
