import Link from "next/link";
import Image from "next/image";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect } from "react";

type UserPrefs = {
  darkMode: boolean;
};

type Props = {
  userPrefs: UserPrefs;
  setUserPrefs: (userPrefs: UserPrefs) => void;
};

const Logo = ({ userPrefs, setUserPrefs }: Props) => {
  // useEffect(() => {
  //   setUserPrefs(userPrefs);
  // }, []);

  const logoSrc = userPrefs.darkMode ? "/white_logo.svg" : "/black_logo.svg";
  const logoAlt = "Indian Runners";

  return (
    <Link
      className="text-5xl sm:text-3xl md:text-5xl text-center sm:text-left font-bold grow"
      href="/"
    >
      <Image
        data-testid="logo"
        src={logoSrc}
        width={88}
        height={50}
        alt={logoAlt}
        className="pt-1"
      />
    </Link>
  );
};

export default Logo;
