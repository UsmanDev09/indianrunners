import { useState, useEffect } from "react";
import Image from "next/image";
import { Josefin_Sans } from "next/font/google";
import axios from 'axios';

import { LandingPage } from "@/types";
import socket from '../socket';

import CardList from "@/components/CardList";

const josef = Josefin_Sans({ subsets: ["latin"] });

export default function Home() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [challenges, setChallenges] = useState([]);
  const [landingPage, setLandingPage] = useState<LandingPage>();

  const fetchLandingPageData = async () => {
    const { data: { data } } = await axios.get(`${process.env.SERVER_DOMAIN}/api/landingpage`);

    setLandingPage(data);
  }

  useEffect(() => {
    fetchLandingPageData()
  }, [])

  return (
    <div className={josef.className}>

      <div className="flex items-center justify-center h-80vh bg-cover bg-center relative">
          <Image
           className="w-full h-[80vh]" 
           width={0}
           height={0}
           sizes={"100vw"}
           src={landingPage?.mainSection?.image! && landingPage?.mainSection?.image!}
           alt="image"
         /> 
      </div>
      <div className=" p-8 dark:bg-dark-gray-800 border-gray mt-10">
        {landingPage?.sections && landingPage?.sections.map((section: any, index: number) => {   
          return (
            <CardList
              key={index}
              title={section.heading}
              setChallenges={setChallenges}
              challenges={section.challenges}
              products={section.products}
            />
          )
        })}

      </div>
    </div>
  );
}
