import ChallengeCard from "./ChallengeCard";
import ProductCard from "./ProductCard";
import { Challenge, Product } from "@/pages/api";
import { Josefin_Sans } from "next/font/google";

import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Sidebar from "./Sidebar";


const josef = Josefin_Sans({ subsets: ["latin"] });

type CardProps = {
title: string;
  setChallenges: Function;
  challenges?: Challenge[];
  filters?: boolean;
  products?: Product[]|Challenge[];
};

const CardList = ({
  challenges,
  products,
  title,
  setChallenges,
  filters,
}: CardProps) => {
  let flex = "";
  if (!filters) {
    flex = "flex-col";
  }  

  return (
    <div>
        <div className={` ${josef.className} text-5xl m-4 font-bold text-center dark:text-blue-text`}>
          {title}
        </div>
        <div>
          {filters && <Sidebar setChallenges={setChallenges} />}
        </div>
        <Swiper
          // onSwiper={setSwiperRef}
          slidesPerView={4}
          spaceBetween={10}
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {challenges && challenges.length !== 0 && (
            challenges.map((challenge, index) => (
              <SwiperSlide key={index}>
                <ChallengeCard
                  challenge={challenge}
                />
              </SwiperSlide>
            ))
          )}
          {products && (
            products.map((product: any, index) => (
              <SwiperSlide key={index}>
                <ProductCard
                  product={product.product}
                />
              </SwiperSlide>
            ))
          )}
        </Swiper>
    </div>
  );
};
export default CardList;
