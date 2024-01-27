import { GetStaticProps } from "next";
import { Josefin_Sans } from "next/font/google";
import Banner from "@/components/Banner";
import OrderSummary from "@/components/orderSummary";

const josef = Josefin_Sans({ subsets: ["latin"] });

type Props = {
  account?: any;
  cart?: any;
  token?: string;
  errors?: string;
};

export default function OrderHistoryPage({ token, cart }: Props) {
  return (
    <div className="container mx-auto mt-0 md:pl-16 sm:pl-8 flex md:flex-nowrap flex-wrap min-h-[calc(100vh-260px)]">
      <ProfileSideBar />
      <OrderSummary />
    </div>
  );
}

import { GetServerSideProps } from "next";
import ProfileSideBar from "@/components/Profile/ProfileSideBar";

export const getServerSideProps: GetServerSideProps = async ({}) => {
  try {
    return { props: {} };
  } catch (err) {
    if (err instanceof Error) {
      return { props: { errors: err.message } };
    }
    return { props: { errors: "An unknown error occurred." } };
  }
};
