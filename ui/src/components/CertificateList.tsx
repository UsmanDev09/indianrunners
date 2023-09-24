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
    <div className="flex gap-2 justify-center mt-12">
      {/* {activities.map( */}
        {/* (certificate, index) => */}
          {/* certificate && ( */}
            <div className="max-w-sm h-[250px] p-6 bg-white dark:bg-violet rounded-lg dark:text-white shadow-xl dark:bg-gray-800 m-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  You particiapted in Monthly Cycling Challange.
                </h5>
              </a>
              <Certificate />
            </div>
          {/* ) */}
      {/* )} */}
    </div>
  );
};

export default CertificateCard;
