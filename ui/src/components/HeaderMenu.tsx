import Link from "next/link";
import { Josefin_Sans } from "next/font/google";

const josef = Josefin_Sans({ subsets: ["latin"] });

const HeaderMenu = () => {

    return (
        <div className="flex items-center grow">
            <button
                role="menu"
                tabIndex={-1}
            >
                <Link
                    className={`${josef.className}  mr-2 text-base`}
                    href="/products/challenges"
                >
                    Challenges&nbsp;
                </Link> 
            </button>
            <button>
                <Link href="/login" className={`${josef.className} text-base mr-2`}>
                    Log In&nbsp;
                </Link>
            </button>
            </div>
    )
}

export default HeaderMenu;