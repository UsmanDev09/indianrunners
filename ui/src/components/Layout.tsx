import React, { ReactNode, useState } from "react";
import Head from "next/head";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import Searchimg from "./Vector.svg";
import globe from "../Assets/down.svg";
import user from "../Assets/carbon_user.svg";
import heart from "../Assets/Vector (1).svg";
import Link from "next/link";
const josef = Josefin_Sans({ subsets: ["latin"] });
type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "SEMASTORE" }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("Email");

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <div
            className={`flex bg-violet text-white text-center ${josef.className} border-black drop-shadow-md p-2`}
          >
            <div className="container mx-auto px-4 color grid sm:grid-cols-2 ">
              <div className="flex flex-row justify-start">
                <div className="text-base">English&nbsp;</div>
                <div>
                  <Image
                    src={globe}
                    alt="Picture of the author"
                    className="h-5"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-4 justify-end">
                <div className="flex flex-row justify-end ">
                  <div className="text-base">Wish List&nbsp;</div>
                  <div>
                    <Image
                      src={heart}
                      alt="Picture of the author"
                      className="h-5"
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-end ">
                  <Link href="/Login" className="text-base">
                    Log In&nbsp;
                  </Link>
                  <div>
                    <Image
                      src={user}
                      alt="Picture of the author"
                      className="h-5"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`flex bg-white text-black ${josef.className} pt-2.5`}>
            <div className="container mx-auto px-4 grid sm:grid-cols-2 justify-items-stretch relative">
              <div className="flex flex-row sm:justify-start items-baseline">
                <Link
                  className="text-5xl sm:text-3xl md:text-5xl text-center sm:text-left font-bold grow"
                  href="/"
                >
                  Hekto
                </Link>
                <div className="text-base lg:text-xl grow hidden sm:inline-flex">
                  <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
                    <button
                      type="button"
                      className="px-3 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-pink duration-150"
                      id="menu-button"
                    >
                      Products
                    </button>
                    {isOpen && (
                      <div
                        className="absolute z-10 w-48 mt-0.5 py-4 px-3 focus:outline-none rounded shadow-lg hover:bg-grey bg-white"
                        role="menu"
                        tabIndex={-1}
                      >
                        <Link
                          className="transition ease-in-out py-4 hover:-translate-y-1 hover:scale-110 hover:text-pink duration-150"
                          href="/products/challenges"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-0"
                        >
                          Challenges
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="sm:flex flex-row py-3 justify-end hidden">
                <div className="rounded">
                  <input
                    title="search"
                    placeholder="Search..."
                    className="bg-white shadow-sm focus:outline-input outline outline-input w-60 rounded-l h-full px-2"
                  />
                </div>
                <div className="bg-pink px-1 outline outline-pink rounded-r">
                  <Image src={Searchimg} alt="Picture of the author" />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="min-h-screen">{children}</div>
      <footer className="flex flex-col justify-center mt-2">
        <div className="bg-light-pink">
          <div
            className={`container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 relative ${josef.className} py-2`}
          >
            <div className="flex flex-col gap-4 justify-start py-5">
              <div className="text-3xl font-bold">Hekto</div>
              <div className="flex flex-row ">
                <div className="rounded">
                  <input
                    title="search"
                    placeholder="Enter your email"
                    className="bg-white shadow-sm focus:outline-input outline outline-input rounded-l p-2"
                  />
                </div>
                <button
                  onClick={() => {
                    setEmail("Try Again!");
                  }}
                  className="bg-pink px-1 outline outline-pink rounded-r text-white"
                >
                  {email}
                </button>
              </div>
              <div className="text-blue-text">
                Enter your email to get notified
              </div>
            </div>
            <div className={`flex flex-col gap-4 ${josef.className} py-5`}>
              <div className="text-3xl font-bold">Categories</div>
              <Link className="text-blue-text" href="/">
                Home
              </Link>
              <Link className="text-blue-text" href="/pages">
                Pages
              </Link>
              <Link className="text-blue-text" href="/products/sofas">
                Products
              </Link>
            </div>
            <div>
              <div className="text-3xl font-bold py-5">Location</div>
              <p className="text-blue-text">
                17 Princess Road, London, Greater London NW1 8JR, UK
              </p>
            </div>
          </div>
        </div>
        <div className="bg-light-blue">
          <div className="flex flex-row justify-center">
            <div className="text-blue-text">SemaStore &copy;</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
