import React from "react";
import SideBar from "../../components/AdminPanel/Sidebar";
import Badges from "../../components/AdminPanel/Badges";
import { ApiService, Badge, BadgeCriteria } from "../api";

const AdminPanelBadges = ({ badges }: { badges: Badge[] }) => {
  console.log(badges);
  return (
    <div className="flex w-full container mx-auto">
      <SideBar />
      <Badges initialBadges={badges} />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookieHeader = context.req.headers.cookie;
  const tokenRegex = /token=([^;]*)/;
  let badges;

  if (cookieHeader) {
    const tokenMatch = cookieHeader.match(tokenRegex);

    let token = null;
    if (tokenMatch && tokenMatch.length > 1) {
      token = tokenMatch[1];
    }

    // console.log(token);

    const badgesResponse = await ApiService.getBadges({}, token);

    if (badgesResponse.data) badges = badgesResponse.data;
    else badges = [];
  }

  return { props: { badges } };
};

export default AdminPanelBadges;
