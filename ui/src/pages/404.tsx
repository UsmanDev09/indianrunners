import { GetStaticProps } from "next";
import { Josefin_Sans } from "next/font/google";
import NotFoundPicture from "../Assets/NotFound.jpg";
const josef = Josefin_Sans({ subsets: ["latin"] });
import Image from "next/image";
import Banner404 from "@/components/Banner404";
import Link from "next/link";

type Props = {
  NotFoundImage: any;
  errors?: string;
};

export default function NotFound({ NotFoundImage }: Props) {
  return (
    <div className={josef.className}>
      <Banner404
        introduction="
        "
        title="Uh Oh! we can not find the requested page"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo."
      />
      <div className="flex justify-center align-center">
        <Link
          href="/"
          className="p-3 bg-pink text-white m-3 font-bold rounded-lg"
        >
          Go to Home Page
        </Link>
      </div>
      <div className="flex justify-center align-center">
        <Image
          src={NotFoundImage}
          alt="404 Image"
          width={700}
          height={475}
          sizes="100vw"
          style={{
            width: "70%",
            height: "50vw",
          }}
        />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    const NotFoundImage = NotFoundPicture;

    return { props: { NotFoundImage } };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
