import Image from "next/image";
import { Josefin_Sans } from "next/font/google";
import ProfileSideBar from "@/components/Profile/ProfileSideBar";
import Link from "next/link";
import { ApiService, Leaderboard } from "../api";

const josef = Josefin_Sans({ subsets: ["latin"] });

const Leaderboard = ({ leaderboards }: { leaderboards: Leaderboard[] }) => {
  return (
    <div className="container mx-auto flex md:flex-nowrap flex-wrap">
      <ProfileSideBar />
      {leaderboards ? (
        leaderboards.map((leaderboard: Leaderboard, index: number) => {
          return (
            <div key={index} className="flex flex-wrap">
              <div
                className={`w-[350px] mt-32 mr-4 shadow-xl ${josef.className}`}
              >
                <div className="flex justify-center bg-light-pink w-full dark:bg-violet rounded-t-lg">
                  <Image
                    src="/cycling.png"
                    width={100}
                    height={80}
                    alt="Challenge Image"
                  />
                </div>

                <div className="bg-white rounded-b-lg p-4">
                  <h2 className="text-xl font-semibold mb-4 underline underline-offset-4 text-center">
                    {leaderboard.challenge?.name}{" "}
                  </h2>

                  <ul>
                    <li className="flex items-center justify-between py-2">
                      <div className="flex">
                        <span className="text-gray-600 mr-2 flex items-center ">
                          {leaderboard.userDetails?.rank}
                        </span>
                        <Image
                          src="/chelsea.png"
                          width={32}
                          height={32}
                          alt="Club Logo"
                        />
                      </div>
                      <div className="flex items-center">
                        <div>
                          <p className="font-semibold">
                            {leaderboard.userDetails?.user?.firstName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {leaderboard.userDetails?.user?.club}
                          </p>
                        </div>
                      </div>
                      <span className="text-gray-600">
                        {leaderboard.userDetails?.distance}
                      </span>
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
          );
        })
      ) : (
        <p> You have not participated in any challenge. </p>
      )}
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookieHeader = context.req.headers.cookie;
  const tokenRegex = /token=([^;]*)/;
  let leaderboards: Leaderboard[] = [];

  if (cookieHeader) {
    const tokenMatch = cookieHeader.match(tokenRegex);

    let token = null;
    if (tokenMatch && tokenMatch.length > 1) {
      token = tokenMatch[1];
    }

    const response = await ApiService.getLeaderboards({}, token);

    if (response.data) leaderboards = response.data;
    else leaderboards = [];

    return { props: { leaderboards } };
  }

  return { props: { leaderboards } };
};

export default Leaderboard;
