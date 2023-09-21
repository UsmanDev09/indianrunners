import Link from "next/link";
import Image from "next/image";
import useLocalStorage from "@/Hooks/useLocalStorage";
import { useEffect } from "react";

type userPrefs = {
    darkMode: boolean
}

type Props = {
    userPrefs: userPrefs
    setUserPrefs: (userPrefs: userPrefs ) => void
}

const Logo = ({ userPrefs, setUserPrefs }: Props) => {

    useEffect(() => {

    }, [userPrefs])
    console.log(userPrefs)
return (
    userPrefs.darkMode ? 
        (
            <Link
                className="text-5xl sm:text-3xl md:text-5xl text-center sm:text-left font-bold grow"
                href="/"
            >
                <Image src='/white_logo.svg' width={88} height={50} alt='Indian runners'/>
            </Link>
        ) : (
            <Link
                className="text-5xl sm:text-3xl md:text-5xl text-center sm:text-left font-bold grow"
                href="/"
            >
                <Image src='/black_logo.svg' width={88} height={50} alt='Indian runners'/>
            </Link> 
        )
    )
    
}

export default Logo;