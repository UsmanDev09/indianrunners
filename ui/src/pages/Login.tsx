import { GetStaticProps } from "next";
import Layout from "@/components/Layout";
import { Josefin_Sans } from "next/font/google";
import NotFoundPicture from "../Assets/NotFound.jpg";
import LoginForm from "@/components/Forms/LoginForm";
const josef = Josefin_Sans({ subsets: ["latin"] });

type Props = {
  NotFoundImage: any;
  errors?: string;
};

export default function Login({ NotFoundImage }: Props) {
  return (
    <div className={josef.className}>
      <Layout>
        <LoginForm />
      </Layout>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    const NotFoundImage = "NotFoundPicture";

    return { props: { NotFoundImage } };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
