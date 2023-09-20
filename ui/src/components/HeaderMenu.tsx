import Link from "next/link";
import Image from "next/image";
import user from "../Assets/carbon_user.svg";

type Props = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}

const HeaderMenu = ({isOpen, setIsOpen} : Props) => {
    return (
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
            <button className="flex flex-row justify-end ">
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
                </button>
            </div>
    )
}

export default HeaderMenu;