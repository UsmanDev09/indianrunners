import { MyGlobalContext } from "@/Hooks/useGlobalContext";
import setAccount from "@/lib/setAccount";
import { Josefin_Sans } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { Key, useContext, useEffect, useState } from "react";
import { Challenge_Props } from "@/Interfaces";

const josef = Josefin_Sans({ subsets: ["latin"] });
type ItemDetail_Props = {
  itemDetails: Challenge_Props[];
};

const OrderSummary = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(MyGlobalContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const order = async () => {
      await fetch("http://localhost:5000/api/orderSummary", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          if (data?.success) setData(data?.data?.cart);
        });
    };
    order();
  }, []);
  console.log(data);
  return (
    <div className={`${josef.className} drop-shadow-md p-12`}>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Item Type
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map(
              (item: ItemDetail_Props, index: Key | null | undefined) =>
                item && (
                  <tr
                    className="border-b border-gray-200 dark:border-gray-700"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                    >
                      Challenge
                    </th>
                    <td className="px-6 py-4">
                      {item.itemDetails[0].challenge.name}
                    </td>
                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                      {item.itemDetails[0].challenge.activity}
                    </td>
                    <td className="px-6 py-4">
                      ${item.itemDetails[0].challenge.price}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full text-center p-12">
        <button
          type="button"
          className="  text-white bg-pink hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
          Confirm your order
        </button>
      </div>
    </div>
  );
};
export default OrderSummary;
