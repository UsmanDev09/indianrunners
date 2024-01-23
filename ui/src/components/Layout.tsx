import { ReactNode, useState, useRef, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { Josefin_Sans } from "next/font/google";

import useLocalStorage from "@/hooks/useLocalStorage";
import Footer from "./Footer";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import Notifications from "./Notifications";
import CartSideBar from "./CartSideBar";
import DarkMode from "./DarkMode";
import { IoCartOutline } from "react-icons/io5";
import { LiaUserSolid } from "react-icons/lia";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import jwt from "jsonwebtoken";

const josef = Josefin_Sans({ subsets: ["latin"] });

type Props = {
  children?: ReactNode;
  title?: string;
  notifications: object[];
};

interface JwtPayload {
  exp: number;
  iat: number;
  userId: string;
}

const Layout = ({
  children,
  title = "Indian Runners",
  notifications,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("Email");
  const [mounted, setMounted] = useState<boolean>(false);
  const [showCartSideBar, setShowCartSideBar] = useState(false);
  const [userPrefs, setUserPrefs] = useLocalStorage("userPrefs", {
    darkMode: false,
  });
  let token = Cookies.get("token");

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, [userPrefs]);

  useEffect(() => {
    token = Cookies.get("token")||'';
    const secret=process.env.JWT_SECRET_KEY||''
    try{
    const { exp } = jwt.verify(token, secret) as JwtPayload
    const seconds = new Date().getTime() / 1000
    if(exp-seconds<=0){
      Cookies.remove("token")
    }
  } catch(e){
    // Cookies.remove("token")
  }
  }, []);

  return (
    <div>
      {mounted && (
        <>
          <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <div>
            <nav className="bg-white dark:bg-dark-card">
              <div
                className={`flex text-black ${josef.className} pt-2.5 justify-between`}
              >
                <div className="container mx-auto flex justify-between w-full">
                  <Logo userPrefs={userPrefs} setUserPrefs={setUserPrefs} />
                  {/* Mobile Navbar */}
                  <div
                    className="flex md:order-2"
                    onClick={() => {
                      document
                        .getElementById("navbar-cta")
                        ?.classList.toggle("hidden");
                    }}
                  >
                    <button
                      data-collapse-toggle="navbar-sticky"
                      type="button"
                      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      aria-controls="navbar-sticky"
                      aria-expanded="false"
                    >
                      <span className="sr-only">Open main menu</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h15M1 7h15M1 13h15"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Desktop Navbar */}
                  <HeaderMenu token={token} />
                  <div className="hidden sm:flex justify-between w-40">
                    <Notifications notifications={notifications} />
                    <DarkMode
                      userPrefs={userPrefs}
                      setUserPrefs={setUserPrefs}
                    />
                    <span className="flex items-center">|</span>
                    {token && (
                      <button onClick={() => setShowCartSideBar(true)}>
                        {/* <Link href="/cart" className="text-base"> */}
                        <IoCartOutline className="w-8 h-8 text-icons-color dark:text-white" />
                        {/* </Link> */}
                        {showCartSideBar && (
                          <CartSideBar
                            setShowCartSidebar={setShowCartSideBar}
                            showCartSideBar={showCartSideBar}
                          />
                        )}
                      </button>
                    )}
                    <button>
                      <Link href="/profile" className="text-base">
                        <LiaUserSolid className="w-8 h-8 text-icons-color dark:text-white" />
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="sm:hidden  items-center text-center justify-between w-full md:w-auto md:order-1"
                id="navbar-cta"
              >
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <Link
                      href="/products/challenges"
                      className="block py-2 pl-3 pr-4 dark:text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      aria-current="page"
                    >
                      Challenges
                    </Link>
                  </li>
                  <li>
                    {token ? (
                      <Link
                        href="/login"
                        onClick={() => {
                          Cookies.remove("token");
                          toast.success("Logged Out Successfully");
                        }}
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        Log out
                      </Link>
                    ) : (
                      <Link
                        href="/login"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        Login
                      </Link>
                    )}
                  </li>
                  <li>
                    <Link
                      href="/cart"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="min-h-screen">{children}</div>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
