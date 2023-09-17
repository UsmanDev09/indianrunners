import { Josefin_Sans } from "next/font/google";
import Image from "next/image";

const josef = Josefin_Sans({ subsets: ["latin"] });
type Banner_Props = {
  introduction?: string;
  description?: string;
  title?: string;
  picture?: any;
};

const Banner = ({
  title,
  description,
  introduction,
  picture,
}: Banner_Props) => {
  return (
    <div className={`bg-light-pink w-full ${josef.className}`}>
      <div className="container mx-auto grid sm:grid-cols-2 place-items-center h-full">
        <div className="flex flex-col justify-center text-center sm:text-left">
          {introduction && (
            <div className="text-pink text-sm sm:text-xl py-4">
              {introduction}
            </div>
          )}
          {title && <div className="text-3xl sm:text-6xl ">{title}</div>}
          {description && (
            <div className="text-sm sm:text-xl py-4">{description}</div>
          )}
        </div>
        {picture && (
          <div className="rounded-full bg-pink/10">
            <Image src={picture} className="p-12" alt="My Image" />
          </div>
        )}
      </div>
    </div>
  );
};
export default Banner;
