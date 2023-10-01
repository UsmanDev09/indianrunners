import Image from "next/image"
import { Josefin_Sans } from "next/font/google";
import ProfileSideBar from "@/components/Profile/ProfileSideBar";
import Link from "next/link";

const josef = Josefin_Sans({ subsets: ["latin"] });

const Leaderboard = () => {
    return (
        <div className="container mx-auto flex md:flex-nowrap flex-wrap">
            <ProfileSideBar />
            <div className="flex flex-wrap">    
                <div className={`w-[350px] mt-32 mr-4 shadow-xl ${josef.className}`}>
                    <div className="flex justify-center bg-light-pink w-full dark:bg-violet rounded-t-lg">
                        <Image src="/cycling.png" width={100} height={80} alt="Challenge Image" />
                    </div>

                <div className="bg-white rounded-b-lg p-4">
                    <h2 className="text-xl font-semibold mb-4 underline underline-offset-4 text-center">Cycling Marathon </h2>

                    <ul>
                        <li className="flex items-center justify-between py-2">
                            <div className="flex">
                                <span className="text-gray-600 mr-2 flex items-center ">1</span>
                                <Image src="/chelsea.png" width={32} height={32} alt="Club Logo"/>
                            </div>
                            <div className="flex items-center">
                            <div>
                                <p className="font-semibold">Usman Siddique</p>
                                <p className="text-sm text-gray-500">Spartans</p>
                            </div>
                            </div>
                            <span className="text-gray-600">1000 km</span>
                        </li>
                        <li className="flex items-center justify-between py-2">
                            <div className="flex">
                                <span className="text-gray-600 mr-2 flex items-center ">2</span>
                                <Image src="/paris-saint-germain.png" width={32} height={32} alt="Club Logo"/>
                            </div>
                            <div className="flex items-center">
                            <div>
                                <p className="font-semibold">Arsslaan Shaheed</p>
                                <p className="text-sm text-gray-500">Ninjas</p>
                            </div>
                            </div>
                            <span className="text-gray-600">100 km</span>
                        </li>
                        <li className="flex items-center justify-between py-2">
                            <div className="flex">
                                <span className="text-gray-600 mr-2 flex items-center ">3</span>
                                <Image src="/barcelona.png" width={32} height={32} alt="Club Logo"/>
                            </div>
                            <div className="flex items-center">
                            <div>
                                <p className="font-semibold">Ayusbiya Shahid</p>
                                <p className="text-sm text-gray-500">Viking</p>
                            </div>
                            </div>
                            <span className="text-gray-600">50 km</span>
                        </li>
                        <li className="flex items-center justify-between py-2">
                            <div className="flex">
                                <span className="text-gray-600 mr-2 flex items-center ">4</span>
                                <Image src="/arsenal.png" width={32} height={32} alt="Club Logo"/>
                            </div>
                            <div className="flex items-center">
                            <div>
                                <p className="font-semibold">Wareesha Anjuman</p>
                                <p className="text-sm text-gray-500">Viking</p>
                            </div>
                            </div>
                            <span className="text-gray-600">5 km</span>
                        </li>
                        <li className="flex items-center justify-between py-2">
                            <div className="flex">
                                <span className="text-gray-600 mr-2 flex items-center ">5</span>
                                <Image src="/barcelona.png" width={32} height={32} alt="Club Logo"/>
                            </div>
                            <div className="flex items-center">
                            <div>
                                <p className="font-semibold">Wareesha Anjuman</p>
                                <p className="text-sm text-gray-500">Viking</p>
                            </div>
                            </div>
                            <span className="text-gray-600">5 km</span>
                        </li>
                    </ul>
                    <div className="w-full text-end mt-4">
                        <Link
                            href="/"
                            className="rounded text-black text-underline underline pt-4 mt-4"
                        >
                            View full leaderboard
                        </Link>
                    </div>
                </div>
                </div>

                <div className={`w-[350px] mt-32 mr-4 shadow-xl ${josef.className}`}>
                <div className="flex justify-center bg-light-pink w-full dark:bg-violet rounded-t-lg">
                    <Image src="/running.png" width={100} height={80} alt="Challenge Image" />
                </div>

                <div className="bg-white rounded-b-lg p-4">
                    <h2 className="text-xl font-semibold mb-4 underline underline-offset-4 text-center">Running Challenge</h2>

                    <ul>
                        <li className="flex items-center justify-between py-2">
                            <div className="flex">
                                <span className="text-gray-600 mr-2 flex items-center ">1</span>
                                <Image src="/barcelona.png" width={32} height={32} alt="Club Logo"/>
                            </div>
                            <div className="flex items-center">
                            <div>
                                <p className="font-semibold">Usman Siddique</p>
                                <p className="text-sm text-gray-500">Spartans</p>
                            </div>
                            </div>
                            <span className="text-gray-600">1000 km</span>
                        </li>
                        <li className="flex items-center justify-between py-2">
                            <div className="flex">
                                <span className="text-gray-600 mr-2 flex items-center ">2</span>
                                <Image src="/paris-saint-germain.png" width={32} height={32} alt="Club Logo"/>
                            </div>
                            <div className="flex items-center">
                            <div>
                                <p className="font-semibold">Arsslaan Shaheed</p>
                                <p className="text-sm text-gray-500">Ninjas</p>
                            </div>
                            </div>
                            <span className="text-gray-600">100 km</span>
                        </li>
                        <li className="flex items-center justify-between py-2">
                            <div className="flex">
                                <span className="text-gray-600 mr-2 flex items-center ">3</span>
                                <Image src="/chelsea.png" width={32} height={32} alt="Club Logo"/>
                            </div>
                            <div className="flex items-center">
                            <div>
                                <p className="font-semibold">Ayusbiya Shahid</p>
                                <p className="text-sm text-gray-500">Viking</p>
                            </div>
                            </div>
                            <span className="text-gray-600">50 km</span>
                        </li>
                        <li className="flex items-center justify-between py-2">
                            <div className="flex">
                                <span className="text-gray-600 mr-2 flex items-center ">4</span>
                                <Image src="/arsenal.png" width={32} height={32} alt="Club Logo"/>
                            </div>
                            <div className="flex items-center">
                            <div>
                                <p className="font-semibold">Wareesha Anjuman</p>
                                <p className="text-sm text-gray-500">Viking</p>
                            </div>
                            </div>
                            <span className="text-gray-600">5 km</span>
                        </li>
                        <li className="flex items-center justify-between py-2">
                            <div className="flex">
                                <span className="text-gray-600 mr-2 flex items-center ">5</span>
                                <Image src="/barcelona.png" width={32} height={32} alt="Club Logo"/>
                            </div>
                            <div className="flex items-center">
                            <div>
                                <p className="font-semibold">Wareesha Anjuman</p>
                                <p className="text-sm text-gray-500">Viking</p>
                            </div>
                            </div>
                            <span className="text-gray-600">5 km</span>
                        </li>
                    </ul>
                    <div className="w-full text-end mt-4">
                        <Link
                            href="/"
                            className="rounded text-black text-underline underline pt-4 mt-4"
                        >
                            View full leaderboard
                        </Link>
                    </div>
                </div>
                </div>

                <div className={`w-[350px] mt-32 shadow-xl ${josef.className}`}>
                <div className="flex justify-center bg-light-pink w-full dark:bg-violet rounded-t-lg">
                    <Image src="/yoga.png" width={100} height={80} alt="Challenge Image" />
                </div>

                <div className="bg-white rounded-b-lg p-4">
                    <h2 className="text-xl font-semibold mb-4 text-center underline underline-offset-4">Weekly Fitness Challenge</h2>

                    <ul>
                        <li className="flex items-center justify-between py-2 ">
                            <div className="flex">
                                <span className="text-gray-600 mr-2 flex items-center ">1</span>
                                <Image src="/paris-saint-germain.png" width={32} height={32} alt="Club Logo"/>
                            </div>
                            <div className="flex items-center">
                            <div>
                                <p className="font-semibold">Usman Siddique</p>
                                <p className="text-sm text-gray-500">Spartans</p>
                            </div>
                            </div>
                            <span className="text-gray-600">1000 km</span>
                        </li>
                        <li className="flex items-center justify-between py-2">
                            <div className="flex">
                                <span className="text-gray-600 mr-2 flex items-center ">2</span>
                                <Image src="/barcelona.png" width={32} height={32} alt="Club Logo"/>
                            </div>
                            <div className="flex items-center">
                            <div>
                                <p className="font-semibold">Arsslaan Shaheed</p>
                                <p className="text-sm text-gray-500">Ninjas</p>
                            </div>
                            </div>
                            <span className="text-gray-600">100 km</span>
                        </li>
                        <li className="flex items-center justify-between py-2 ">
                            <div className="flex">
                                <span className="text-gray-600 mr-2 flex items-center ">3</span>
                                <Image src="/arsenal.png" width={32} height={32} alt="Club Logo"/>
                            </div>
                            <div className="flex items-center">
                            <div>
                                <p className="font-semibold">Ayusbiya Shahid</p>
                                <p className="text-sm text-gray-500">Viking</p>
                            </div>
                            </div>
                            <span className="text-gray-600">50 km</span>
                        </li>
                        <li className="flex items-center justify-between py-2">
                            <div className="flex">
                                <span className="text-gray-600 mr-2 flex items-center ">4</span>
                                <Image src="/barcelona.png" width={32} height={32} alt="Club Logo"/>
                            </div>
                            <div className="flex items-center">
                            <div>
                                <p className="font-semibold">Wareesha Anjuman</p>
                                <p className="text-sm text-gray-500">Viking</p>
                            </div>
                            </div>
                            <span className="text-gray-600">5 km</span>
                        </li>
                        <li className="flex items-center justify-between py-2">
                            <div className="flex">
                                <span className="text-gray-600 mr-2 flex items-center ">5</span>
                                <Image src="/barcelona.png" width={32} height={32} alt="Club Logo"/>
                            </div>
                            <div className="flex items-center">
                            <div>
                                <p className="font-semibold">Wareesha Anjuman</p>
                                <p className="text-sm text-gray-500">Viking</p>
                            </div>
                            </div>
                            <span className="text-gray-600">5 km</span>
                        </li>
                    </ul>
                    <div className="w-full text-end mt-4">
                        <Link
                            href="/"
                            className="rounded text-black text-underline underline pt-4 mt-4"
                        >
                            View full leaderboard
                        </Link>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard;