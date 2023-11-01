import { GetStaticProps } from "next";
import { Josefin_Sans } from "next/font/google";
import SignUpForm from "@/components/Forms/SignUp";

const josef = Josefin_Sans({ subsets: ["latin"] });

type Props = {
  NotFoundImage: any;
  errors?: string;
};

export default function Login({ NotFoundImage }: Props) {
  return (
    <div className={josef.className}>
      <SignUpForm />
    </div>
  );
}
