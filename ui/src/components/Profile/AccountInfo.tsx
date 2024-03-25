import Link from "next/link";
import { BiPencil } from "react-icons/bi";

const AccountInfo = ({ user }: { user: any }) => {
  return (
    <div className="pt-16 md:pl-16 pl-0 flex flex-wrap justify-between w-full dark;  ">
      <div className="w-full">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-black dark:text-white">
            Profile Completion
          </span>
          <span className="text-sm font-medium text-dark dark:text-white">
            {user?.profileCompleted ? Math.floor(user?.profileCompleted) : 0}%
          </span>
        </div>
        <div className="w-full border border-black dark:border-white rounded-full p-1 dark:bg-gray-full">
          <div
            className="bg-gray-700 h-2.5 rounded-full dark:bg-gray-200"
            style={{
              width: `${user?.profileCompleted ? user?.profileCompleted : 0}% `,
            }}
          ></div>
        </div>
      </div>

      <div className="item-left w-full dark:text-blue-text">
        <div className="py-8">
          <p className="font-unica text-[25px] font-bold">PROFILE CONTACT</p>
          <div className="flex flex-col items-start">
            <p className="text-gray-700 min-w-[150px] dark:text-white font-bold">
              NAME{" "}
            </p>
            <p className="font-unica mb-4">{user?.name}</p>
            <p className="text-gray-700 text-[15px] min-w-[150px] dark:text-white font-bold">
              EMAIL{" "}
            </p>
            <p className="font-comfortaa mb-4">{user?.email}</p>
            <p className="text-gray-700 text-[15px] min-w-[150px] dark:text-white font-bold">
              USER NAME{" "}
            </p>
            <p className="font-comfortaa mb-4">{user?.userName}</p>
            <p className="text-gray-700 text-[15px] min-w-[150px] dark:text-white font-bold">
              REWARD POINTS{" "}
            </p>

            <p className="font-comfortaa">{user?.rewardPoints}</p>
          </div>
        </div>

        <div className="py-8">
          <p className="font-unica text-[25px]">SHIPPING DETAILS</p>
          <div className="flex flex-col items-start">
            {user?.shippingDetail?.country && (
              <div>
                <p className="text-gray-700 min-w-[150px]">COUNTRY </p>
                <p className="font-unica mb-4">
                  {" "}
                  {user?.shippingDetail.country}
                </p>
              </div>
            )}
            {user?.shippingDetail?.city && (
              <div>
                <p className="text-gray-700 text-[15px] min-w-[150px]">CITY </p>
                <p className="font-comfortaa mb-4">
                  {user?.shippingDetail?.city}
                </p>
              </div>
            )}
            {user?.shippingDetails?.address && (
              <div>
                <p className="text-gray-700 text-[15px] min-w-[150px]">
                  ADDRESS{" "}
                </p>
                <p className="font-comfortaa mb-4">
                  {user?.shippingDetail?.address}
                </p>
              </div>
            )}
            {user?.shippingDetail?.contact && (
              <div>
                <p className="text-gray-700 text-[15px] min-w-[150px]">
                  CONTACT{" "}
                </p>
                <p className="font-comfortaa">{user.shippingDetail.contact}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="md:w-[20%] min-w-[250px] ">
        <div>
          <Link
            href="/profile/complete-profile"
            className="text-black xs:mb-4 lg:mb-0 dark:text-blue-text hover:bg-gray-700 hover:text-white dark:bg-dark-button dark:hover:bg-gray font-comfortaa inline-flex items-center bg-white  text-gray-800 font-semibold py-2 px-4 rounded-[12px] shadow mt-5"
          >
            <BiPencil className="text-[20px]" /> Complete Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
