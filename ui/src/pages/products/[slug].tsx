import Banner from "@/components/Banner";
import Layout from "@/components/Layout";
import { Josefin_Sans } from "next/font/google";
import Chair from "../../Assets/Sofa.png";
import Prod1 from "../../Assets/Sofa4.png";
import Prod2 from "../../Assets/Sofa1.png";
import Prod3 from "../../Assets/Sofa2.png";
import Prod4 from "../../Assets/Sofa3.png";
import CardList from "@/components/CardList";
import { useRouter } from "next/router";
const josef = Josefin_Sans({ subsets: ["latin"] });
import { ItemCard_Props } from "@/Interfaces";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

type Props = {
  items: ItemCard_Props[];
  errors?: string;
};

export default function Challenges({ items }: Props) {
  const router = useRouter();
  const slug = (router.query.slug as string) || null;
  const [challenges, setChall] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchChallenges = async () => {
      const chall = await fetch("http://localhost:5000/api/challenge", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) =>
        response.json().then((chall) => setChall(chall.data))
      );
    };
    fetchChallenges();
  }, []);
  return (
    <div className={`${josef.className} flex flex-col`} >
      <Banner
        introduction="Home &rarr; Challenges"
        title="Explore Our Challenges"
        picture={Chair}
      />
      {challenges && (
        <CardList
          title={`Featured ${slug}`}
          setChallenges={setChall}
          ItemCard_List={challenges}
          filters={true}
        />
      )}
    </div>
  );
}


