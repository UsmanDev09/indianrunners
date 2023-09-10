import { GetStaticProps } from "next";
import Layout from "@/components/Layout";
import { Josefin_Sans } from "next/font/google";
import LoginForm from "@/components/Forms/LoginForm";
import Cart from "@/components/Cart";
import Banner from "@/components/Banner";
import Basket from "../Assets/basket1.png";
import getAccount from "@/lib/getAccount";
const josef = Josefin_Sans({ subsets: ["latin"] });

type Props = {
  account?: any;
  cart?: any;
  token?: string;
  errors?: string;
};

export default function CartPage({ token, cart }: Props) {
  return (
    <Layout>
      <div className={josef.className}>
        <Banner
          introduction="Home &rarr; Cart"
          title="Please review your cart"
        />
        <Cart />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetStaticProps = async ({ params }) => {
  try {
    return { props: {} };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
