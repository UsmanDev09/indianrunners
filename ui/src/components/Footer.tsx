import Link from "next/link";
import { Josefin_Sans } from "next/font/google";

const josef = Josefin_Sans({ subsets: ["latin"] });

const Footer = () => {
  return (
    <footer className="bg-white flex flex-col justify-center mt-32 dark:bg-dark">
      <div className="container mx-auto dark:bg-dark">
        <div
          className={`container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 relative ${josef.className} py-2 dark:text-blue-text`}
        >
          <div className="flex flex-col gap-4 justify-start py-5">
            <div className="text-3xl font-bold">Hekto</div>
            <div className="flex  dark:bg-dark ">
                <input
                  title="search"
                  placeholder="Enter your email"
                  className="bg-white shadow-sm focus:outline-inputs outline outline-input rounded p-2 dark:bg-dark dark:text-white"
                />
           </div>
            <div className="dark:text-blue-text  text-black">
              Enter your email to get notified
            </div>
          </div>
          <div className={`flex flex-col gap-4 ${josef.className} py-5`}>
            <div className="text-3xl font-bold">Categories</div>
            <Link className="dark:text-blue-text  text-black" href="/">
              Home
            </Link>
            <Link className="dark:text-blue-text  text-black" href="/pages">
              Pages
            </Link>
            <Link
              className="dark:text-blue-text  text-black"
              href="/products/sofas"
            >
              Products
            </Link>
          </div>
          <div>
            <div className="text-3xl font-bold py-5 dark:text-blue-text  text-black">
              Location
            </div>
            <p className="dark:text-blue-text  text-black">
              17 Princess Road, London, Greater London NW1 8JR, UK
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
