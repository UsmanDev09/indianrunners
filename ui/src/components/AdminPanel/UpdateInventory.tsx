import { Inventory } from "@/pages/api";
import { Datepicker } from "flowbite-react";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateInventory = ({
  Inventory,
  setOpenCreateInventoryDrawer,
  openCreateInventoryDrawer,
}: {
  Inventory: Inventory;
  setOpenCreateInventoryDrawer: (action: boolean) => void;
  openCreateInventoryDrawer: boolean;
}) => {
  const [formData, setFormData] = useState({
    size: Inventory.details.size,
    quantity: Inventory.details.quantity,
    color: Inventory.details.color,
  });
  useEffect(() => setFormData(Inventory.details), [openCreateInventoryDrawer]);

  const FormatValues = (data: any) => {
    let newData: any = { details: {}, product: "" };
    Object.keys(data).forEach((key) => {
      if (data[key] !== "") {
        newData.details[key] = data[key];
      }
    });
    newData.product = Inventory.product;
    return newData;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      EventTarget & (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cookieHeader = document.cookie;
    const tokenRegex = /token=([^;]*)/;
    let token = null;
    if (cookieHeader) {
      const tokenMatch = cookieHeader.match(tokenRegex);
      if (tokenMatch && tokenMatch.length > 1) {
        token = tokenMatch[1];
      }
    }
    const filteredFormData = FormatValues(formData);
    try {
      const response = await fetch(
        `${process.env.SERVER_DOMAIN}/api/inventory/product/${Inventory.product}`,
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
          body: JSON.stringify(filteredFormData),
        }
      );

      // const UInventory = await response.json();

      if (response.ok) {
        toast.success("inventory updated");
        // setInventory(UInventory);
        setOpenCreateInventoryDrawer(false);
      } else {
        toast.error("Failed to Update Inventory");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div
      id="drawer-create-Inventory-default"
      className={`fixed right-0 z-40 ${
        openCreateInventoryDrawer ? "block" : "hidden"
      } mt-10 w-full  h-[1200px] max-w-xs overflow-y-auto  p-4 bg-white dark:bg-gray-800`}
    >
      <h5
        id="drawer-label"
        className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        New Inventory
      </h5>
      <button
        onClick={() => setOpenCreateInventoryDrawer(!openCreateInventoryDrawer)}
        type="button"
        data-drawer-dismiss="drawer-update-product-default"
        aria-controls="drawer-update-product-default"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <form action="#" encType="multipart/form-data" className=" h-full mb-32">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="size"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Size
            </label>
            <input
              type="size"
              name="size"
              onChange={handleInputChange}
              id="rewardpoints"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={formData.size}
              required
            />
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Quantity
            </label>
            <input
              type="quantity"
              name="quantity"
              onChange={handleInputChange}
              id="rewardpoints"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={formData.quantity}
              required
            />
          </div>
          <div>
            <label
              htmlFor="color"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Color
            </label>
            <input
              type="color"
              name="color"
              onChange={handleInputChange}
              id="rewardpoints"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={formData.color}
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="text-white w-40 justify-center bg-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Update Inventory
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateInventory;
