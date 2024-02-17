import { useEffect, useState } from "react";
import Cookies from "js-cookie";



const ProductFilters = ({ setProducts } : { setProducts: Function }) => {
  const [name, setName] = useState("");
  const [minprice, setminprice] = useState("");
  const [maxprice, setmaxprice] = useState("");

  const filterProducts = () => {
    const token = Cookies.get("token");
    const params = {
      name: name,
      minPrice: minprice,
      maxPrice: maxprice,
    };

    const fetchProducts = async () => {
      const chall = fetch(
        `${process.env.SERVER_DOMAIN}/api/product?${new URLSearchParams(params)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ).then((response) => {
        response.json().then((products) => {console.log('chall', products), setProducts(products.data)})
    });
    };
    fetchProducts();
  };

  useEffect(() => {
    filterProducts();
  }, [
    name,
    minprice,
    maxprice,
  ]);
  return (
    <div className="dark:bg-white rounded w-0 sm:w-max z-50">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={() => {
          document
            .getElementById("default-sidebar")
            ?.classList.toggle("-translate-x-full");
        }}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="w-64 shadow-2xl rounded h-full transition-transform -translate-x-full sm:translate-x-0 bg-white"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="text-center text-3xl">Filters</div>

          <ul className="space-y-2 font-medium">
          <li>
              <div className="text-center m-2">Sort by Name</div>
             
            
              <div className="flex items-center mb-4">
                <input
                  onClick={() => setName("asc")}
                  id="default-Name-1"
                  type="radio"
                  value=""
                  name="default-Name"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Ascending
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onClick={() => setName("desc")}
                  id="default-Name-2"
                  type="radio"
                  value=""
                  name="default-Name"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Descending
                </label>
              </div>
            </li>
            {/* <li className="pt-8">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Min-max range
              </label>
                Minimum Price: {minprice}
              <input
                id="minimum"
                type="range"
                min="0"
                max="10000"
                onChange={(e) => {
                  setminprice(e.target.value);
                }}
                className="w-full h-2 accent-green bg-pink rounded-lg appearance-none cursor-pointer"
              />
              Maximum Price: {maxprice}
              <input
                id="maximum"
                type="range"
                min="0"
                max="10000"
                onChange={(e) => {
                  setmaxprice(e.target.value);
                }}
                className="w-full h-2 accent-green bg-pink rounded-lg appearance-none cursor-pointer"
              />
            </li> */}
            <li className="pt-12">
              <button
                className="text-white rounded bg-pink w-full text-2xl"
                onClick={filterProducts}
              >
                Apply Filters
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default ProductFilters;
