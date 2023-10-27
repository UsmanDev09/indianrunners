import Image from "next/image";
import ChallengeCard from "./ChallengeCard";
import ProductCard from "./ProductCard";
import { Challenge, Product } from "@/pages/api";
import { Josefin_Sans } from "next/font/google";

import Sidebar from "./Sidebar";

const josef = Josefin_Sans({ subsets: ["latin"] });

type ItemList_Props = {
  title: string;
  setChallenges: Function;
  challenges?: Challenge[];
  filters?: boolean;
  products?: Product[];
};

const CardList = ({
  challenges,
  products,
  title,
  setChallenges,
  filters,
}: ItemList_Props) => {
  let flex = "";
  if (!filters) {
    flex = "flex-col";
  }

  return (
    <div>
      <div className="container mx-auto mt-32">
        <div
          className={` ${josef.className} text-5xl m-4 font-bold text-center dark:text-blue-text`}
        >
          {title}
        </div>
        <div className={`flex ${flex}`}>
          <div>
            {filters && <Sidebar setChallenges={setChallenges} />}
          </div>
          <div className={`ml-10 flex flex-wrap gap-4 justify-center ${filters}`}>
            {challenges && challenges.length !== 0 && (
              challenges.map((challenge, index) => (
                <ChallengeCard
                  key={index}
                  challenge={challenge}
                />
              ))
            )}
            {products && products.length !== 0 && (
              products.map((items: any, index) => (
                <ProductCard
                  key={index}
                  product={items.product}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardList;
