import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import Certificate from "./Profile/Certificate";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
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
  const [certs, setCerts] = useState([]);
  useEffect(() => {
    const token = Cookies.get("token");
    
    const fetchCerts = async () => {
      const cart = await fetch(`${process.env.SERVER_DOMAIN}/api/user/certificate`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) =>
        response.json().then((cart) => {if(cart.success){setCerts(cart.data)} else {toast.error(cart.message.message)}})
      );
    };
    fetchCerts();
  }, []);

  return (
    <div className="flex flex-wrap gap-2 justify-center mt-12">
      {certs.map(
        (cert, index) =>
          cert && (
            <div
              key={index}
              className="max-w-sm h-[500px] p-6 bg-white dark:bg-dark-gray-800 rounded-lg dark:text-white shadow-xl dark:bg-gray-800 m-5"
            >
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  You particiapted in Monthly Cycling Challange.
                </h5>
              </a>
              <Certificate picture={cert} />
            </div>
          )
      )}
    </div>
  );
};

export default CertificateCard;
