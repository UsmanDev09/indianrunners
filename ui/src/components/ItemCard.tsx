import { MyGlobalContext } from "@/Hooks/useGlobalContext";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

const josef = Josefin_Sans({ subsets: ["latin"] });

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
    
    <div className="w-full h-full max-w-sm bg-white shadow shadow-xl rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <Link href="#">
            <Image className="p-8 rounded-t-lg" width={200} height={200} src={picture} alt="product image" />
        </Link>
        <div className="px-5 pb-5">
            <a href="#">
                <h5 className={`${josef.className} text-xl font-semibold tracking-tight text-gray-900 dark:text-white`}>Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
            </a>
            <div className="flex items-center mt-2.5 mb-5">
                <svg className="w-4 h-4 text-yellow mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-4 h-4 text-yellow mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-4 h-4 text-yellow mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-4 h-4 text-yellow mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-4 h-4 text-gray dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <span className={` ${josef.className} bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3`}>5.0</span>
            </div>
            <div className="flex items-center justify-between">
                <span className={`${josef.className} text-3xl font-bold text-gray-900 dark:text-white`}>${price}</span>
                <a href="#" className={` ${josef.className} text-white bg-gray hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>Add to cart</a>
            </div>
        </div>
    </div>

  );
};

export default ItemCard;
