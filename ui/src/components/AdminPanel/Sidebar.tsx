import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="">
      <aside
        id="sidebar"
        className=" z-20 flex flex-col flex-shrink-0 hidden w-64 h-full font-normal duration-75 lg:flex transition-width  dark:bg-sidebar-blue"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col flex-1 min-h-0 pt-0 dark:bg-sidebar-blue dark:border-gray-700">
          <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-sidebar-blue dark:divide-gray-700">
              <ul className="pb-2 space-y-2 bg-gray-200">
                <li>
                  <form action="#" method="GET" className="lg:hidden">
                    <label htmlFor="mobile-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="email"
                        id="mobile-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </li>
                <li>
                  <Link
                    href="/admin-panel/dashboard"
                    className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                    <span className="ml-3 dark:text-white">
                      Dashboard
                    </span>
                  </Link>
                </li>

                <ul id="dropdown-crud" className="space-y-2 py-2">
                  <li>
                    <Link
                      href="/admin-panel/products"
                      className="text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-white dark:hover:bg-gray-700 dark:bg-gray-700"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin-panel/challenges"
                      className="text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-white dark:hover:bg-gray-700 dark:bg-gray-700"
                    >
                      Challenges
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin-panel/challenge-categories"
                      className="text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-white dark:hover:bg-gray-700  dark:bg-gray-700"
                    >
                      Challenge Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin-panel/challenges"
                      className="text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-white dark:hover:bg-gray-700 dark:bg-gray-700"
                    >
                      Badges
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin-panel/users"
                      className="text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-white dark:hover:bg-gray-700  dark:bg-gray-700"
                    >
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin-panel/inventory"
                      className="text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-white dark:hover:bg-gray-700 dark:bg-gray-700"
                    >
                      Inventories
                    </Link>
                  </li>
                </ul>
                <li>
                  <Link
                    href="/admin-panel/landing-page"
                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clip-rule="evenodd"
                        fillRule="evenodd"
                        d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                      ></path>
                    </svg>
                    <span
                      className="flex-1 ml-3 text-left whitespace-nowrap"
                    >
                      Landing Page
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/admin-panel/activity-approvals'
                    className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clip-rule="evenodd"
                        fillRule="evenodd"
                        d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                      ></path>
                    </svg>
                    <span
                      className="flex-1 ml-3 text-left whitespace-nowrap"
                    >
                      Activity Approvals
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
      <div className="fixed inset-0 z-10 hidden" id="sidebarBackdrop"></div>
    </div>
  );
};

export default Sidebar;
