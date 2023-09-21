import { useState } from "react";
import Banner from "@/components/Banner";
import { Josefin_Sans } from "next/font/google";

import socket from '../socket';
import Chair from "../Assets/chair.png";
import Prod1 from "../Assets/Prod1.png";
import NotFound from "../Assets/NotFound.jpg";

import Prod4 from "../Assets/Prod4.png";
import CardList from "@/components/CardList";

const josef = Josefin_Sans({ subsets: ["latin"] });

const ItemCards = [
  { title: "Cantilever chair", price: "$42.00", picture: Prod1 },
  { title: "Cantilever chair", price: "$30.00", picture: Prod4 },
  { title: "Cantilever chair", price: "$51.00", picture: Prod1},
  { title: "Cantilever chair", price: "$80.00", picture: Prod4 },
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
      <CardList
        title="Featured Challenges"
        setChallenges={setchall}
        ItemCard_List={ItemCards}
      />
    </div>
  );
}
