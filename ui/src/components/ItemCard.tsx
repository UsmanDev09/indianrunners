import { MyGlobalContext } from "@/Hooks/useGlobalContext";
import Image from "next/image";
import { useContext, useState } from "react";

type ItemCard_Props = {
  title?: string;
  price?: string;
  picture?: any;
};

const ItemCard = ({ title, price, picture }: ItemCard_Props) => {
  const [button, setbutton] = useState("Add to cart");
  const { dispatch } = useContext(MyGlobalContext);
  return (
    <div className="group transition duration-300 hover:scale-110">
      <div className=" bg-prod mt-4 mx-4 rounded flex flex-col justify-center items-center h-60">
        <Image src={picture} alt="product"></Image>
        <button
          onClick={() => setbutton("Added")}
          className=" transition duration-300 group-hover:block group-hover:text-white absolute z-10 bg-green rounded hidden bottom-1/4 px-2"
        >
          {button}
        </button>
      </div>
      <div className=" h-20 bg-white drop-shadow-md mb-4 mx-4 rounded flex flex-col justify-center items-center transition duration-300 group-hover:bg-prodblue">
        <div className="group-hover:text-white text-pink font-bold">
          {title}
        </div>
        <div className="group-hover:text-white">{price}</div>
      </div>
    </div>
  );
};

export default ItemCard;
