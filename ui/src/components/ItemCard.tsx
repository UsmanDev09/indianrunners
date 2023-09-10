import { MyGlobalContext } from "@/Hooks/useGlobalContext";
import Image from "next/image";
import { useContext, useState } from "react";

type ItemCard_Props = {
  title?: string;
  price?: string;
  picture?: any;
  type?: string;
  _id?: string;
};

const ItemCard = ({ title, price, picture, type, _id }: ItemCard_Props) => {
  const [button, setbutton] = useState("Add to cart");
  const { dispatch } = useContext(MyGlobalContext);
  const AddtoCart = () => {
    const token = localStorage.getItem("token");
    const AddtoCart = async () => {
      const cart = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          itemType: "challenge",
          itemDetails: [
            {
              challenge: { _id: _id },
              challengeCategories: [],
            },
          ],
        }),
      }).then((response) => response.json().then((cart) => console.log(cart)));
    };
    AddtoCart();
    setbutton("Added");
  };
  return (
    <div className="group transition duration-300 hover:scale-110">
      <div className=" bg-prod mt-4 mx-4 rounded flex flex-col justify-center items-center h-60">
        <Image src={picture} alt="product"></Image>
        <button
          onClick={() => AddtoCart()}
          className=" transition duration-300 group-hover:block group-hover:text-white absolute z-10 bg-green rounded hidden bottom-1/4 px-2"
        >
          {button}
        </button>
      </div>
      <div className=" h-20 bg-white drop-shadow-md mb-4 mx-4 rounded flex flex-col justify-center items-center transition duration-300 group-hover:bg-prodblue">
        <div className="group-hover:text-white text-pink font-bold">
          {title}
        </div>
        <div className="group-hover:text-white">${price}</div>
      </div>
    </div>
  );
};

export default ItemCard;
