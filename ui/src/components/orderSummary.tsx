import { MyGlobalContext } from "@/Hooks/useGlobalContext";
import setAccount from "@/lib/setAccount";
import { Josefin_Sans } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
const josef = Josefin_Sans({ subsets: ["latin"] });
const OrderSummary = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(MyGlobalContext);

  const data = {};
  const token = localStorage.getItem("token");

  const user = async () => {
    await fetch("http://localhost:5000/api/user/profile", {
      body: JSON.stringify({
        ...data,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
      });
  };
  const order = async () => {
    await fetch("http://localhost:5000/api/orderSummary", {
      body: JSON.stringify({
        ...data,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);

        if (data?.success) {
        }
      });
  };
  return (
    <div
      className={`flex place-content-center ${josef.className} drop-shadow-md`}
    ></div>
  );
};
export default OrderSummary;
