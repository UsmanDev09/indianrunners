import { MyGlobalContext } from "@/Hooks/useGlobalContext";
import Image from "next/image";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import Chair from "../Assets/chair.png";

type ItemCard_Props = {
  title?: string;
  price?: string;
  picture?: any;
};

const Cart = ({ title, price, picture }: ItemCard_Props) => {
  const [cart, setCart] = useState([
    { name: "Ahmed", price: 0, quantity: 0 },
    { name: "Adil", price: 0, quantity: 0 },
  ]);

  const handleDecrement = (item: {
    name: string;
    price: number;
    quantity: number;
  }) => {
    const value = (
      document.getElementById(`product-${item.name}`) as HTMLInputElement
    ).value;
    const newVal = parseInt(value) - 1;
    (
      document.getElementById(`product-${item.name}`) as HTMLInputElement
    ).value = newVal.toString();
  };

  const handleIncrement = (item: {
    name: string;
    price: number;
    quantity: number;
  }) => {
    const value = (
      document.getElementById(`product-${item.name}`) as HTMLInputElement
    ).value;
    const newVal = parseInt(value) + 1;
    (
      document.getElementById(`product-${item.name}`) as HTMLInputElement
    ).value = newVal.toString();
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchCart = async () => {
      const cart = await fetch("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => response.json().then((cart) => setCart(cart.data)));
    };
    fetchCart();
  }, []);
  return (
    <div className="p-12">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Qty
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map(
              (item, index) =>
                item && (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center"
                  >
                    <td className="w-32 p-4">
                      <Image src={Chair} alt="Apple Watch" />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                          onClick={() => handleDecrement(item)}
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <input
                            type="number"
                            id={`product-${item.name}`}
                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={0}
                            readOnly
                            required
                          />
                        </div>
                        <button
                          className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                          onClick={() => handleIncrement(item)}
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${item.price}
                    </td>
                    <td className="px-6 py-4">
                      <button className="font-medium text-red-600 dark:text-red-500 hover:underline">
                        Remove
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end text-right pt-12">
        <button
          type="button"
          className=" text-white bg-pink hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-3.5 h-3.5 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 21"
          >
            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
          </svg>
          Buy now
        </button>
        <button
          type="button"
          className=" text-white bg-pink focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Choose plan
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Cart;
