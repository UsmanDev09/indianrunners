import Link from "next/link";
import { Josefin_Sans } from "next/font/google";

const josef = Josefin_Sans({ subsets: ["latin"] });

const HeaderMenu = () => {

  const role = localStorage.getItem('role')

  return (
    <div className="hidden sm:flex items-center grow dark:text-white">
      <button role="menu">
      {role === 'admin' &&
      <button>
        <Link href="/admin-panel" className={`${josef.className} underline bg-light-pink dark:bg-dark-green text-base mr-2 p-2 hover:text-white`}>
          Admin Panel
        </Link>
      </button>}
        <Link
          className={`${josef.className}  mr-2 text-base`}
          href="/products/challenges"
        >
          Challenges
        </Link>
      </button>
      <button>
        <Link href="/login" className={`${josef.className} text-base mr-2`}>
          Log In
        </Link>
      </button>
    </div>
  );
};



export default HeaderMenu;
