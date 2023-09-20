import { ReactNode, useState, useRef, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { Josefin_Sans } from "next/font/google";

import useLocalStorage from "@/Hooks/useLocalStorage";
import Footer from "./Footer";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import Notifications from "./Notifications";
import DarkMode from "./DarkMode";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';

const josef = Josefin_Sans({ subsets: ["latin"] });

type Props = {
  children?: ReactNode;
  title?: string;
  notifications: object[];
};

const Layout = ({ children, title = "Indian Runners", notifications }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("Email");
  const [mounted, setMounted] = useState<boolean>(false);
  const [userPrefs, setUserPrefs] = useLocalStorage('userPrefs', {darkMode: false});
  
  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, [userPrefs]);

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
            <header className="bg-violet">
              <nav className="bg-violet">
              <div className={`flex bg-white text-black ${josef.className} pt-2.5 justify-between`}>
                <div className="container mx-auto flex justify-between w-full">
                  <Logo userPrefs={userPrefs} setUserPrefs={setUserPrefs} />
                  <HeaderMenu isOpen={isOpen} setIsOpen={setIsOpen} />
                  <div className="flex justify-between w-40">
                    <Notifications notifications={notifications} />  
                    <DarkMode userPrefs={userPrefs} setUserPrefs={setUserPrefs} />
                    <span className="flex items-center">|</span>
                    <button>
                      <Link href="/cart" className="text-base">
                        <AiOutlineShoppingCart className="w-8 h-8"/>
                      </Link>
                    </button>
                    <button>
                      <Link href='/profile' className="text-base">
                        <CgProfile className="w-8 h-8"/>
                      </Link>
                    </button>
                  </div>
                  </div>
                </div>
              </nav>
            </header>
            <div className="min-h-screen">{children}</div>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
