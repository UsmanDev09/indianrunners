import { useState } from "react";
import Banner from "@/components/Banner";
import { Josefin_Sans } from "next/font/google";


import socket from '../socket';
import Chair from "../Assets/chair.png";
import Prod2 from "../Assets/Prod2.png";
import NotFound from "../Assets/NotFound.jpg";
import Prod3 from "../Assets/Prod3.png";

import Prod4 from "../Assets/Prod4.png";
import Prod1 from "../Assets/Prod1.png";

import CardList from "@/components/CardList";

const josef = Josefin_Sans({ subsets: ["latin"] });

const ItemCards = [
  { name: "Weekly Basketball Championship", price: "$42.00", picture: Prod1 },
  { name: "Cycling for a month challenge", price: "$30.00", picture: Prod2 },
  { name: "Daily Skating Challenge", price: "$51.00", picture: Prod3},
  { name: "Monthly Fitness Challenge", price: "$80.00", picture: Prod4 },
];

export default function Home() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chall, setchall] = useState([]);
  

  return (
    <div className={josef.className}>
      <Banner
        introduction="Lorem Ipsum Dolor Sit Amet"
        title="Lorem Ipsum Dolor Sit Ammet "
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
        picture={Chair}
      />
      <div className=" p-8 dark:bg-dark-gray-800 border-gray mt-10">
        {/* <CardList
          title="Featured Challenges"
          setChallenges={setchall}
          ItemCard_List={ItemCards}
        /> */}

      </div>
    </div>
  );
}
