import Link from "next/link";
import { Josefin_Sans } from "next/font/google";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const josef = Josefin_Sans({ subsets: ["latin"] });
type HeaderMenu_Props = {
  token?: string;
};
const HeaderMenu = ({ token }: HeaderMenu_Props) => {
  const role = localStorage.getItem("role");

  return (
    <div className="hidden sm:flex items-center grow dark:text-white">
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
      <Link
        className={`${josef.className}  mr-2 text-base`}
        href="/store/challenges"
      >
        Challenges
      </Link>
      <Link
        className={`${josef.className}  mr-2 text-base`}
        href="/store/products"
      >
        Products
      </Link>
      <button>
        {token ? (
          <a
            href="#"
            onClick={() => {
              Cookies.remove("token");
              toast.success("Logged Out Successfully");
              document.location.replace("/");
            }}
            className={`${josef.className} text-base mr-2`}
          >
            Log out
          </a>
        ) : (
          <Link href="/login" className={`${josef.className} text-base mr-2`}>
            Log In
          </Link>
        )}
      </button>
    </div>
  );
};

export default HeaderMenu;
