import Link from "next/link";
import { Josefin_Sans } from "next/font/google";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const josef = Josefin_Sans({ subsets: ["latin"] });
type HeaderMenu_Props = {
  token?: string;
};
const HeaderMenu = ({ token }: HeaderMenu_Props) => {
  const role = Cookies.get("role");

  return (
    <div className="hidden sm:flex  items-center grow dark:text-white">
      {role === "admin" && (
        <button>
          <Link
            href="/admin-panel"
            className={`${josef.className} underline bg-light-pink dark:bg-dark-green text-base mr-2 p-2 hover:text-white`}
          >
            Admin Panel
          </Link>
        </button>
      )}
     <ul className="flex flex-row mt-4">
      <Link
        className={`${josef.className}  mr-2 text-base`}
        href="/store/challenges"
      >
                <li className="mr-2 text-base hover:bg-gray-300">Challanges</li>
      </Link>
      <Link
        className={`${josef.className}  mr-2 text-base`}
        href="/store/products"
      >
        <li className="mr-2 text-base hover:bg-gray-300">Product</li>
      </Link>
      <button>
        {token ? (
          <Link
            href="/login"
            onClick={() => {
              Cookies.remove("token");
              toast.success("Logged Out Successfully");
            }}
            className={`${josef.className} text-base mr-2`}
          >
        <li className="mr-2 text-base hover:bg-gray-300">LogOut</li>
          </Link>
        ) : (
          <Link href="/login" className={`${josef.className} text-base mr-2 `}>
           <li className="mr-2 text-base hover:bg-gray-300">LogIn</li>
          </Link>
        )}
      </button>
      </ul>
    </div>
  );
};

export default HeaderMenu;
