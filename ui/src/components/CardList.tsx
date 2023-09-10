import Image from "next/image";
import ItemCard from "./ItemCard";
import { ItemCard_Props } from "@/Interfaces";
import NotFound from "../Assets/NotFound.jpg";

type ItemList_Props = {
  title?: string;
  ItemCard_List: ItemCard_Props[];
};

const CardList = ({ ItemCard_List, title }: ItemList_Props) => {
  return (
    <div>
      <div className="container mx-auto my-8">
        <div className="text-5xl m-4 font-bold text-center">{title}</div>
        <div className="grid md:grid-cols-4 justify-center">
          {ItemCard_List.map((Card, index) => (
            <ItemCard
              key={index}
              title={Card.name}
              price={Card.price}
              picture={Card?.picture || NotFound}
              type={Card?.type}
              _id={Card?._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default CardList;
