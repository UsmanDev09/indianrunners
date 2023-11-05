import Inventory from "@/components/AdminPanel/Inventory";
import SideBar from "../../components/AdminPanel/Sidebar";

const AdminPanelInventory = ({ inventory }: { inventory: any }) => {
  console.log(inventory);
  return (
    <div className="flex w-full container mx-auto">
      <SideBar />
      <Inventory inventories={inventory} />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookieHeader = context.req.headers.cookie;
  const tokenRegex = /token=([^;]*)/;
  let inventory;

  if (cookieHeader) {
    const tokenMatch = cookieHeader.match(tokenRegex);

    let token = null;
    if (tokenMatch && tokenMatch.length > 1) {
      token = tokenMatch[1];
    }

    const response = await fetch("http://localhost:5000/api/inventory", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((inventory) => inventory);

    if (response.data) inventory = response.data;
    else inventory = [];
  }

  return { props: { inventory } };
};

export default AdminPanelInventory;
