"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { Pagination, Navigation, Autoplay } from 'swiper/modules';

export default function PopularSlider() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
 
    axios.get('http://localhost/don-corleone-api/get_popular.php')
      .then(res => setProducts(res.data))
      .catch(err => console.error("PHP xətası:", err));
  }, []);

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-[1400px] mx-auto px-4">
        
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-950">
          ƏN ÇOX BAXILANLAR
        </h2>

        <Swiper
         
          slidesPerView={1}
          spaceBetween={30}
          loop={false}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }, 
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper !pb-12"
        >
          {products?.map((item) => (
            <SwiperSlide key={item.id} className="flex justify-center items-center">
           
              <div className="w-full group bg-[#f9f9f9] rounded-[24px] p-6 transition-all duration-300 hover:bg-white hover:shadow-2xl border border-transparent hover:border-gray-100 flex flex-col h-full">
                
             
                <div className="w-full aspect-square flex items-center justify-center mb-6">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

               
                <div className="text-left mt-auto">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-bold text-[#2d8a41]">{item.price} AZN</span>
                    <span className="text-sm text-gray-400 line-through">
                      {(parseFloat(item.price) * 1.2).toFixed(0)} AZN
                    </span>
                  </div>
                  
                  <h3 className="text-gray-800 text-lg font-normal leading-tight h-12 line-clamp-2">
                    {item.name}
                  </h3>

                
                  <div className="mt-4">
                    <span className="bg-[#82b440] text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
                      indi al 2 ay sonra ödə
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

     
      <style jsx global>{`
        /* Swiper oxlarını və nöqtələrini modernləşdiririk */
        .mySwiper .swiper-button-next,
        .mySwiper .swiper-button-prev {
          color: #333 !important;
          background: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .mySwiper .swiper-button-next:after,
        .mySwiper .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: 900;
        }
        .mySwiper .swiper-pagination-bullet-active {
          background: #2d8a41 !important; /* Embawood yaşılı */
          width: 20px;
          border-radius: 5px;
        }
      `}</style>
    </section>
  );
}