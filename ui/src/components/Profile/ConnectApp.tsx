import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';

import Label from "../Label/Label";
import { useEffect } from "react";

const ConnectApp = () => {
    const router = useRouter();

  useEffect(() => {

    const { code } = router.query;

    if (code) {
        try {
        const token = localStorage.getItem("token");

        fetch("http://localhost:5000/api/activity", {
            method: "POST",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: { 'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            },
            redirect: "follow", 
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
                code:code
            }),
          }).then((activities) => console.log(activities) )
        } catch (err: unknown) {
            if(err instanceof Error) console.error(err)
        }
    }
  }, [router.query]);

  return (
    <div className="p-16 w-full">
      <p className="font-unica text-[30px] py-5">APPS</p>
      <div className="max-w-[900px] font-comfortaa">
        
        <div className="mt-12">
          <Label label="Connect to an app to integrate your activities" />
          <div className="flex xl:flex-row flex-col ">
            <Link
              href="https://www.strava.com/oauth/authorize?client_id=113257&response_type=code&redirect_uri=http://localhost:3000/profile/apps/exchange_token&approval_prompt=force&scope=activity:read_all"
              className="w-[200px] flex justify-center items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg mr-8"
            >
            <button className="w-[200px] flex justify-center items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg mr-8 xl:mb-0 mb-2">
                <Image src="/strava.png" alt="Strava" width={200} height={180}/>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectApp;
