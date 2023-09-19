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

export default function OrderSummaryPage({ token, cart }: Props) {
  return (
    <div className={josef.className}>
      <Banner
        introduction="Home &rarr; Cart &rarr; Order Summary"
        title="Please review your order summary"
      />
      <OrderSummary />
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
