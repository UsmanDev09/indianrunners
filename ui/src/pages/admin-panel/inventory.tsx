import Inventory from "@/components/AdminPanel/Inventory";
import SideBar from "../../components/AdminPanel/Sidebar";
import { InferGetServerSidePropsType } from "next";

const AdminPanelInventory = ({inventory,products}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex w-full container mx-auto">
      <SideBar />
      <Inventory inventories={inventory} products={products} />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookieHeader = context.req.headers.cookie;
  const tokenRegex = /token=([^;]*)/;
  let inventory;
  let products;
  if (cookieHeader) {
    const tokenMatch = cookieHeader.match(tokenRegex);

    let token = null;
    if (tokenMatch && tokenMatch.length > 1) {
      token = tokenMatch[1];
    }

    const response = await fetch(`${process.env.SERVER_DOMAIN}/api/inventory`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((inventory) => inventory);

    if (response.data) inventory = response.data;
    else inventory = [];

    const productList = await fetch(`${process.env.SERVER_DOMAIN}/api/product`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((products) => products);

    if (response.data) products = productList.data;
    else products = [];
  }

  return { props: { inventory, products } };
};

export default AdminPanelInventory;
