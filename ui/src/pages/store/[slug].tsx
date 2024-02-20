import Banner from "@/components/Banner";
import { Josefin_Sans } from "next/font/google";
import Chair from "../../assets/Sofa.png";
import CardList from "@/components/CardList";
import { useRouter } from "next/router";
import { useState } from "react";
import { ApiService, Challenge, Product } from "../api";
import { Challenges } from "@/components/Store/Challenges";
import { Products } from "@/components/Store/Products";

const josef = Josefin_Sans({ subsets: ["latin"] });

export default function Slug({ items }: { items: Challenge[] | Product[] }) {
  const router = useRouter();
  const slug = (router.query.slug as string) || null;
  const [challenges, setChallenges] = useState(slug === "challenge" ? items : []);
  const [products, setProducts] = useState(slug === "products" ? items : []);
  console.log('pro', products)
  const slugName = slug?.length ?? 0 > 0 ? (slug?.charAt(0).toUpperCase() ?? '') + slug?.slice(1) : '';
  console.log(items)
  return (
    <div className={`${josef.className} flex flex-col`}>
      <Banner
        introduction={slugName}
        title={`Explore Our ${slugName}`}
        picture={Chair}
      />

      {/* Renders challenges */}
      {slug === "challenges" && items && (
        <Challenges 
          title={`Featured ${slug}`}
          setChallenges={setChallenges}
          challenges={challenges}
        />
        // <CardList
        //   title={`Featured ${slug}`}
        //   setChallenges={setChallenges}
        //   challenges={items}
        //   filters={true}
        // />
      )}

      {/* Renders products */}
      {slug === "products" && items && (
        <Products 
          title={`Featured ${slug}`}
          setProducts={setProducts}
          products={products}
        />
        // <CardList
        //   title={`Featured ${slug}`}
        //   setChallenges={setChallenges}
        //   products={items}
        //   filters={false}
        // />
      )}
    </div>
  );
}
export const getServerSideProps = async (context: any) => {
  const cookieHeader = context.req.headers.cookie;
  const tokenRegex = /token=([^;]*)/;
  let slugs = context.query.slug,
    items,
    response: any;

  if (cookieHeader) {
    const tokenMatch = cookieHeader.match(tokenRegex);

    let token = null;
    if (tokenMatch && tokenMatch.length > 1) {
      token = tokenMatch[1];
    }

    if (slugs === "challenges")
      response = await ApiService.getAllChallenges({}, token);
    else if (slugs === "products")
      response = await ApiService.getAllProducts({}, token);
    else response = [];
    if (response.data) items = response.data;
    else items = [];

    return { props: { items } };
  }

  return { props: {} };
};
