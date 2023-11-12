import CertificateCard from "@/components/CertificateList";
import ProfileSideBar from "../../components/Profile/ProfileSideBar";
import Head from "next/head";
const Activities = () => {
  return (
    <div>
      <Head>
        <title>Certificates</title>
        <meta name="description" content="Checkout our cool page" key="desc" />
        <meta property="og:title" content="Social Title for Cool Page" />
        <meta property="og:description" content="Certificates" />
        <meta
          property="og:image"
          content={
            window.location.search.split("image=")[1]
              ? window.location.search.split("image=")[1]
              : window.location.href
          }
        />
      </Head>
      <div className="container mx-auto flex md:flex-nowrap flex-wrap xl:flex-nowrap min-h-[calc(100vh-260px)]">
        <ProfileSideBar />
        <CertificateCard />
      </div>
    </div>
  );
};

export default Activities;
