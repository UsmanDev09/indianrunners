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
    <div className="hidden sm:flex items-center grow dark:text-white pb-5">
      <ul className="flex flex-row mt-4 ">
        {role === "admin" && (
          <Link
            href="/admin-panel"
            className={`${josef.className}  mr-8 hover:underline`}
          >
            <li className="hover:underline text-lg">Admin Panel</li>
          </Link>
        )}
        <Link className={`${josef.className} text-lg`} href="/store/challenges">
          <li className="mr-8 text-lg hover:underline">Challanges</li>
        </Link>
        <Link className={`${josef.className} text-lg`} href="/store/products">
          <li className="mr-8 text-lg hover:underline">Product</li>
        </Link>
        {token ? (
          <Link
            href="/login"
            onClick={() => {
              Cookies.remove("token");
              toast.success("Logged Out Successfully");
            }}
            className={`${josef.className} text-lg`}
          >
            <li className="mr-8 text-lg hover:underline">LogOut</li>
          </Link>
        ) : (
          <Link href="/login" className={`${josef.className} text-lg `}>
            <li className="mr-8 text-lg hover:underline">LogIn</li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default HeaderMenu;
