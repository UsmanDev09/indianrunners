import Inventory from "@/components/AdminPanel/Inventory";
import SideBar from "../../components/AdminPanel/Sidebar";
import AdminPanelManualActivities from "@/components/AdminPanel/AdminPanelManualActivities";

const ManualActivites = ({ activities }: { activities: any }) => {

  return (
    <div className="flex w-full container mx-auto">
      <SideBar />
      <AdminPanelManualActivities initialActivities={activities} />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookieHeader = context.req.headers.cookie;
  const tokenRegex = /token=([^;]*)/;
  let activities;
  
  if (cookieHeader) {
    const tokenMatch = cookieHeader.match(tokenRegex);

    let token = null;
    if (tokenMatch && tokenMatch.length > 1) {
      token = tokenMatch[1];
    }

    const response = await fetch(`${process.env.SERVER_DOMAIN}/api/activity/manual`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    
    }).then(res => res.json())

    if (response) activities = response.data;
    else activities = [];
  }

  return { props: { activities } };
};

export default ManualActivites;
