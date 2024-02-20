import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User } from "@/types";

const ConnectApp = () => {
  const router = useRouter();
  const { code } = router.query;
  const [user, setUser] = useState<User>();
  const token = Cookies.get("token");
  useEffect(() => {
    try {
      if (code) {
        fetch(`${process.env.SERVER_DOMAIN}/api/activity`, {
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
  }, [code, token]);

  useEffect(() => {
    fetch(`${process.env.SERVER_DOMAIN}/api/user/profile`, {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    }).then(async (res) => {
      const response = await res.json()
      if(response?.success) setUser(response.data)
      else toast.error("Error fetching profile")
    })
    console.log(user)
  }, [token])

  return (
    <div className="w-full h-auto ml-8  mt-8 max-w-sm p-4 rounded-lg  sm:p-6  dark:border-gray-700 dark:text-white">
      <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
        Connect Apps
      </h5>
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Connect with one of our available wallet providers or create a new one.
      </p>
      <ul className="my-4 flex justify-between items-center">
        <li>
          <Link
            href={`https://www.strava.com/oauth/authorize?client_id=113257&response_type=code&redirect_uri=${process.env.CLIENT_URL}/profile/apps/exchange_token&approval_prompt=force&scope=activity:read_all`}
            className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
          >
            <button className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-lg xl:mb-0 mb-2">
              <Image src="/strava.png" alt="Strava" width={40} height={40} />
            </button>
            <span className="flex-1 ml-3 whitespace-nowrap">Strava</span>
          </Link>
        </li>
        {user?.appsConnected === 'Strava' && <button className="bg-green-500 p-3 mt-0">Connected</button>}
      </ul>
      
    </div>
  );
};

export default ConnectApp;
