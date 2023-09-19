import { ReactNode, useState, useRef, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { Josefin_Sans } from "next/font/google";
import Image from "next/image";
import { createPortal } from "react-dom";

import { IoIosNotificationsOutline } from "react-icons/io";
import Searchimg from "./Vector.svg";
import globe from "../Assets/down.svg";
import user from "../Assets/carbon_user.svg";
import heart from "../Assets/Vector (1).svg";

const josef = Josefin_Sans({ subsets: ["latin"] });

type Props = {
  children?: ReactNode;
  title?: string;
  notifications: object[];
};

const Layout = ({ children, title = "SEMASTORE", notifications }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("Email");
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLButtonElement | null>(null);
  const iconRef = useRef<HTMLButtonElement | null>(null);

  const onClickNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        showNotifications &&
        dropdownRef.current &&
        iconRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    },
    [showNotifications]
  );

  useEffect(() => {
    setMounted(true);

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      setMounted(false);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications, handleClickOutside]);

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
            <header>
              <nav className="bg-violet">
                <div
                  className={`container mx-auto flex text-white text-center ${josef.className} border-black drop-shadow-md p-2`}
                >
                  <div className="flex justify-between w-full">
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
                        <Link href="/cart" className="text-base">
                          Cart&nbsp;
                        </Link>
                        <div>
                          <Image
                            src={heart}
                            alt="Picture of the author"
                            className="h-5"
                          />
                        </div>
                      </div>

                      <div className="flex flex-row justify-end ">
                        <Link href="/login" className="text-base">
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
                <div
                  className={`flex bg-white text-black ${josef.className} pt-2.5`}
                >
                  <div className="container mx-auto  flex justify-between w-full">
                    <div className="flex flex-row sm:justify-start items-baseline">
                      <Link
                        className="text-5xl sm:text-3xl md:text-5xl text-center sm:text-left font-bold grow"
                        href="/"
                      >
                        Hekto
                      </Link>
                      <div className="text-base lg:text-xl grow hidden sm:inline-flex">
                        <div
                          className="dropdown"
                          onClick={() => setIsOpen(!isOpen)}
                        >
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
                    <div className="sm:flex flex-row py-3 items-center justify-end hidden"></div>

                    {/* Notifications */}

                    <button
                      ref={iconRef}
                      onClick={onClickNotifications}
                      className="flex items-center"
                    >
                      <IoIosNotificationsOutline className="w-8 h-8 text-purple fill-purple after:content-[''] after:w-5 after:h-5 after:rounded-xl after:bg-red" />
                    </button>
                    {createPortal(
                      <div
                        ref={dropdownRef}
                        className={`${
                          showNotifications ? "block" : "hidden"
                        } flex justify-center absolute right-16 top-24 transition transform`}
                      >
                        <div
                          id="dropdownNotification"
                          className="w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
                          aria-labelledby="dropdownNotificationButton"
                        >
                          <div className="block px-4 py-2 font-mediu text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                            Notifications
                          </div>
                          <div className="divide-y divide-gray-100 dark:divide-gray-700">
                            {notifications && notifications.length > 0 ? (
                              notifications.map(
                                (notification: any, index: number) => {
                                  return (
                                    <a
                                      key={index}
                                      href="#"
                                      className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                      <div className="flex-shrink-0">
                                        <Image
                                          className="rounded-full w-11 h-11"
                                          src="/default-profile-image.png"
                                          alt="Jese image"
                                          width={8}
                                          height={8}
                                        />
                                        <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                                          <svg
                                            className="w-2 h-2 text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 18 18"
                                          >
                                            <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                                            <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                                          </svg>
                                        </div>
                                      </div>
                                      <div className="w-full pl-3">
                                        <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                                          {" "}
                                          {notification.message}{" "}
                                        </div>
                                        <div className="text-xs text-blue-600 dark:text-blue-500">
                                          a few moments ago
                                        </div>
                                      </div>
                                    </a>
                                  );
                                }
                              )
                            ) : (
                              <p className="m-2">
                                {" "}
                                You do not have any notifications.{" "}
                              </p>
                            )}
                          </div>
                          {notifications && notifications.length > 0 && (
                            <Link
                              href="/notifications"
                              className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                            >
                              <div className="inline-flex items-center ">
                                <svg
                                  className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 14"
                                >
                                  <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                </svg>
                                View all
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>,
                      document.body
                    )}
                  </div>
                </div>
              </nav>
            </header>
            <div className="min-h-screen">{children}</div>
            <footer className="bg-light-pink flex flex-col justify-center mt-2">
              <div className="container mx-auto">
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
                  <div
                    className={`flex flex-col gap-4 ${josef.className} py-5`}
                  >
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
        </>
      )}
    </div>
  );
};

export default Layout;
