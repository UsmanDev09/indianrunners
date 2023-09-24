import { MyGlobalContext } from "@/Hooks/useGlobalContext";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import Certificate from "./Profile/Certificate";

const josef = Josefin_Sans({ subsets: ["latin"] });

type CertificateCard_Props = {
  title?: string;
  price?: string;
  picture?: any;
  type?: string;
  _id?: string;
};

const CertificateCard = ({
  title,
  price,
  picture,
  type,
  _id,
}: CertificateCard_Props) => {
  const [activities, setActivities] = useState([]);
  const { dispatch } = useContext(MyGlobalContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchCart = async () => {
      const cart = await fetch("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) =>
        response.json().then((cart) => setActivities(cart.data))
      );
    };
    fetchCart();
  }, []);
  console.log(activities);
  return (
    <div className="grid md:grid-cols-2 gap-2 justify-center">
      {activities.map(
        (certificate, index) =>
          certificate && (
            <div className="max-w-sm p-6 bg-white dark:bg-violet border border-gray-200 rounded-lg dark:text-white shadow dark:bg-gray-800 dark:border-gray-700 m-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
              <Certificate />
            </div>
          )
      )}
    </div>
  );
};

export default CertificateCard;
