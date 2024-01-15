import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { Josefin_Sans } from "next/font/google";

const josef = Josefin_Sans({ subsets: ["latin"] });

type Props = {
  notifications: object[];
};

const Notifications = ({ notifications }: Props) => {
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const iconRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onClickNotifications = (e: React.MouseEvent) => {
    console.log(e.detail);
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
  }, [showNotifications]);

  return (
    <>
      <button
        ref={iconRef}
        onClick={onClickNotifications}
        className="flex items-center"
      >
        <IoIosNotificationsOutline className="w-8 h-8 mt-1 text-icons-color dark:text-white" />
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
            <div
              className={`${josef.className} block px-4 py-2 font-mediu text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white`}
            >
              Notifications
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {notifications && notifications.length > 0 ? (
                notifications.map((notification: any, index: number) => {
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
                        <p
                          className={`${josef.className} text-gray-500 text-sm mb-1.5 dark:text-gray-400`}
                        >
                          {notification.message}
                        </p>
                        <p
                          className={`${josef.className} text-xs text-blue-600 dark:text-blue-500`}
                        >
                          a few moments ago
                        </p>
                      </div>
                    </a>
                  );
                })
              ) : (
                <p className={`${josef.className} m-2`}>
                  You do not have any notifications.
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
    </>
  );
};

export default Notifications;
