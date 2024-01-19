import AdminPanelLandingPageCustomization from '../../components/AdminPanel/AdminPanelLandingPageCustomization';
import SideBar from "../../components/AdminPanel/Sidebar";

const LandingPageCustomization = ({ landingpage }: { landingpage: any }) => {
  return (
    <div className="flex w-full container mx-auto">
      <SideBar />
      <AdminPanelLandingPageCustomization landingpage={landingpage}/>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookieHeader = context.req.headers.cookie;
  const tokenRegex = /token=([^;]*)/;
  let landingpage;

  if (cookieHeader) {
    const tokenMatch = cookieHeader.match(tokenRegex);

    let token = null;
    if (tokenMatch && tokenMatch.length > 1) {
      token = tokenMatch[1];
    }

    const response = await fetch(`${process.env.SERVER_DOMAIN}/api/landingpage`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((landingpage) => landingpage);

    if (response.data) landingpage = response.data;
    else landingpage = [];

  }

  return { props: { landingpage } };
};

export default LandingPageCustomization;
