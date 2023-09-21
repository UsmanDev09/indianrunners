import Image from "next/image";
import ItemCard from "./ItemCard";
import { ItemCard_Props } from "@/Interfaces";
import { Josefin_Sans } from "next/font/google";

import NotFound from "../Assets/NotFound.jpg";
import Sidebar from "./Sidebar";

const josef = Josefin_Sans({ subsets: ["latin"] });

type ItemList_Props = {
  title?: string;
  setChallenges: Function;
  ItemCard_List: ItemCard_Props[];
  filters?: boolean;
};

const CardList = ({
  ItemCard_List,
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
      <div className="container mx-auto my-8">
        <div className={` ${josef.className} text-5xl m-4 font-bold text-center dark:text-blue-text`}>
          {title}
        </div>
        <div className={`flex ${flex}`}>
          {filters && <Sidebar setChallenges={setChallenges} />}
          <div className="grid md:grid-cols-4 gap-4 justify-center">
            {ItemCard_List.length != 0 ? (
              ItemCard_List.map((Card, index) => (
                <ItemCard
                  key={index}
                  title={Card.name}
                  price={Card.price}
                  picture={Card?.picture || NotFound}
                  type={Card?.type}
                  _id={Card?._id}
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
