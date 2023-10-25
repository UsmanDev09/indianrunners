import Image from "next/image";
import ItemCard from "./ItemCard";
import { Challenge, Product } from "@/pages/api";
import { Josefin_Sans } from "next/font/google";

import Golf from "../Assets/golf.png";
import Sidebar from "./Sidebar";

const josef = Josefin_Sans({ subsets: ["latin"] });

type ItemList_Props = {
  title?: string;
  setChallenges: Function;
  challenges: Challenge[];
  filters?: boolean;
};

const CardList = ({
  challenges,
  title,
  setChallenges,
  filters,
}: ItemList_Props) => {
  let flex = "";
  if (!filters) {
    flex = "flex-col";
  }

  return (
    <div>
      <div className="container mx-auto mt-32">
        <div
          className={` ${josef.className} text-5xl m-4 font-bold text-center dark:text-blue-text`}
        >
          {title}
        </div>
        <div className={`flex ${flex}`}>
          <div>
            {filters && <Sidebar setChallenges={setChallenges} />}
          </div>
          <div className={`ml-10 flex flex-wrap gap-4 justify-center ${filters}`}>
            {challenges && challenges.length !== 0 ? (
              challenges.map((challenge, index) => (
                <ItemCard
                  key={index}
                  challenge={challenge}
                />
              ))
            ) : (
              <div className="text-center text-3xl">
                No items based on your filters
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardList;
