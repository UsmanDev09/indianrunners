import ChallengeCard from "./ChallengeCard";
import ProductCard from "./ProductCard";
import { Challenge, Product } from "@/pages/api";
import { Josefin_Sans } from "next/font/google";

import { Pagination, Navigation, A11y, Scrollbar, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Sidebar from "./Store/ChallengeFilters";


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
        <Swiper
          // onSwiper={setSwiperRef}
          slidesPerView={4}
          spaceBetween={-60}
          breakpoints={{
            100: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: -60,
            },
          }}
        
          navigation={true}
          modules={[Pagination, Navigation, Scrollbar, A11y, EffectFade]}
          scrollbar={{ draggable: true }}
          className="h-[500px] "
        >
          <div className="w-80">
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
              <SwiperSlide key={index} className="!flex justify-center items-center">
                <ProductCard
                  product={product.product}
                />
              </SwiperSlide>
            ))
          )}
          </div>
        </Swiper>
    </div>
  );
};
export default CardList;
