import { Product } from "@/pages/api";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";

import { Loader } from "./Loader";
import toast from "react-hot-toast";

const josef = Josefin_Sans({ subsets: ["latin"] });

const ProductCard = ({ product }: { product: Product }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [
    openPopupToSelectCategories,
    setOpenPopupToSelectCategories,
  ] = useState(false);
  const [cart, setCart] = useState<
    { product: { _id: number }; productQuantity: number }[]
  >([{ product: { _id: 0 }, productQuantity: 0 }]);
  const [loading, setLoading] = useState(false);

  const addProductsToCartForDisplaying = (product: Product) => {
    // if(cartForDisplaying?.itemDetails.challenge === challenge) {
    //   setCartForDisplaying({
    //       itemDetails: {
    //         ...cartForDisplaying.itemDetails,
    //         categories: [...cartForDisplaying.itemDetails.categories, category ]
    //       }
    //     })
    // } else {
    //   setCartForDisplaying({
    //     itemDetails: {
    //       challenge: challenge,
    //       categories: [category]
    //     }
    //   })
    // }
  };

  const removeFromCart = async (cartId: number, productId: number) => {
    const token = Cookies.get("token");
    const response = await fetch(
      `${process.env.SERVER_DOMAIN}/api/cart/challenge`,
      {
        method: "PUT",
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
          itemType: "product",
          itemDetails: [
            {
              product: { _id: productId },
              _id: cartId,
            },
          ],
        }),
      }
    ).then((response) =>
      response
        .json()
        .then((cart) => console.log(cart))
        .catch((err) => console.log(err))
    );
  };

  const addToCart = async (productId: number | undefined) => {
    setLoading(true);
    console.log("addding to cart");
    const token = Cookies.get("token");

    const response = await fetch(
      `${process.env.SERVER_DOMAIN}/api/cart/product`,
      {
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
          itemType: "product",
          itemDetails: [
            {
              product: { _id: productId },
              productQuantity: 1,
            },
          ],
        }),
      }
    )
      .then((response) =>
        response.json().then((cart) => {
          if (!cart.success) toast.error(cart.message.message);
          setCart([{ product: { _id: 0 }, productQuantity: 0 }]);
          setLoading(false);
        })
      )
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
        if (err instanceof Error) {
          console.log(err.message);
          toast.error(err.message);
        }
      });
  };

  return (
    <div className="w-[320px] sm:w-[360px] h-[375px] relative max-w-sm bg-white border border-gray-200 dark:bg-dark-card rounded-lg dark:border-gray-600 m-8">
      <Image
        className="p-8  rounded-t-lg m-auto"
        width={200}
        height={200}
        src={product?.image || "/images.jpeg"}
        alt="product image"
      />
      <div className="px-5 pb-5">
        <div
          id="crypto-modal"
          aria-hidden="true"
          className={`absolute ${
            openPopupToSelectCategories ? "flex" : "hidden"
          }  mt-12 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={() =>
                  setOpenPopupToSelectCategories(!openPopupToSelectCategories)
                }
                type="button"
                className="absolute top-3 right-2.5 text-gray-300 bg-gray-700 dark:bg-dark-green rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
                data-modal-hide="crypto-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          </div>
        </div>
        <h5
          className={`${josef.className} text-2xl font-semibold text-black tracking-tight dark:text-white`}
        >
          {product?.name}
        </h5>
        <div>
          <p className="overflow-hidden text-clip whitespace-nowrap dark:text-white mt-1 mb-2">
            {product?.description}
          </p>
        </div>
        <div className="dark:text-white font-bold">
          Reward:
          <span className=" text-gray-800 font-medium px-[4px] py-0.5 rounded dark:bg-gray-700 dark:text-gray-200">
            {product?.rewardPoints} points
          </span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span
            className={`${josef.className} text-3xl font-bold text-gray-900 dark:text-white`}
          >
            INR. {product?.price}
          </span>
          <button
            type="submit"
            onClick={() => addToCart(product._id)}
            className={`${josef.className} flex text-white cursor bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-40 py-2.5 justify-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800`}
          >
            <span className="mr-2">
              {loading && <Loader width={4} height={4} />}{" "}
            </span>
            <p className=""> Add to cart </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
