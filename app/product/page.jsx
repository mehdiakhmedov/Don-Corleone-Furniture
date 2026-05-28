'use client';

import { useState, useEffect } from "react";
import Link from "next/link"; 
import axios from "axios";

export default function ProductPage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost/don-corleone-api/get_furnitures.php")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Məhsullar gələrkən xəta baş verdi:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-24 font-bold text-gray-500 text-lg animate-pulse">
        Məhsullar kataloqu yüklənir...
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 pb-20">
      
      <div className="text-center py-16 bg-white border-b border-gray-100 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
          Məhsullarımız
        </h1>
        <p className="mt-3 text-gray-500 text-sm md:text-base max-w-md mx-auto">
          Don Corleone keyfiyyəti ilə hazırlanan unikal və elit mebel kolleksiyaları
        </p>
      </div>

      <div className="container mx-auto px-4 mt-12">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {products.map((product) => {
         
            const hasDiscount = product.old_price && Number(product.old_price) > Number(product.price);

            return (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
              >
        
                <div className="relative w-full h-[280px] overflow-hidden bg-gray-100">
                  <img 
                    src={`/${product.image}`} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  
                  {hasDiscount && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      Endirim
                    </span>
                  )}

                  <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">
                    {product.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                
                      {hasDiscount && (
                        <span className="text-gray-400 text-xs line-through mb-0.5">
                          {product.old_price} AZN
                        </span>
                      )}
                      <span className="text-orange-600 font-extrabold text-lg md:text-xl">
                        {product.price} AZN
                      </span>
                    </div>

            
                    <Link 
                      href={`/product/${product.id}`}
                      className="bg-gray-900 hover:bg-orange-600 text-white text-xs md:text-sm font-medium px-4 py-2.5 rounded-xl transition-colors duration-300 inline-block text-center"
                    >
                      Məhsula bax
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
}