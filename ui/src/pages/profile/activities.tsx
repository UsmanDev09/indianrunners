import ActivityCard from "@/components/ActivityCard";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";

import { ApiService, Activity } from "../api";

const Activities = ({ activities }: { activities: any }) => {
  return (
    <div className="container mx-auto flex md:flex-nowrap flex-wrap xl:flex-nowrap min-h-[calc(100vh-260px)]">
      <ProfileSideBar />
      <ActivityCard activities={activities} />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  // Get token from cookies or request headers
  const cookieHeader = context.req.headers.cookie;
  const tokenRegex = /token=([^;]*)/;
  let activities: Activity[] = [];

  if (cookieHeader) {
    const tokenMatch = cookieHeader.match(tokenRegex);

    let token = null;
    if (tokenMatch && tokenMatch.length > 1) {
      token = tokenMatch[1];
    }

    const response = await ApiService.getActivities({}, token);

    if (response.data) activities = response.data;
    else activities = [];

  }

  return { props: { activities } };
};

export default Activities;
