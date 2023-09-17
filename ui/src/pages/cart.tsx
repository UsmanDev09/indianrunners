import { GetStaticProps } from "next";
import { Josefin_Sans } from "next/font/google";
import Cart from "@/components/Cart";
import Banner from "@/components/Banner";

const josef = Josefin_Sans({ subsets: ["latin"] });

type Props = {
  account?: any;
  cart?: any;
  token?: string;
  errors?: string;
};

export default function CartPage({ token, cart }: Props) {
  return (
    <div className={josef.className}>
      <Banner
        introduction="Home &rarr; Cart"
        title="Please review your cart"
      />
      <Cart />
    </div>
  );
}

export const getServerSideProps: GetStaticProps = async ({ params }) => {
  try {
    return { props: {} };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
