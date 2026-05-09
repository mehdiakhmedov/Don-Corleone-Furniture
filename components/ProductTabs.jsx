"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";

const categories = ["All", "Sofa", "Table", "Chair", "Bed", "Lightning", "Decore"];

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("All");
  const [products, setProducts] = useState([]);

  
  const handleWishlist = (product) => {
 
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
  
    const index = wishlist.findIndex(item => item.id === product.id);
    
    if (index > -1) {
      
      wishlist.splice(index, 1);
    } else {
     
      wishlist.push(product);
    }
    
 
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    
    window.dispatchEvent(new Event("wishlistUpdate"));
  };

  useEffect(() => {
    const categoryForQuery = activeTab.toLowerCase();
    axios
      .get(`http://localhost/don-corleone-api/get_products.php?cat=${categoryForQuery}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("PHP linkində problem var:", err);
      });
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
    
      <div className="flex overflow-x-auto md:justify-center items-center space-x-6 md:space-x-12 cursor-pointer border-b border-gray-200 mb-8 md:mb-12 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`pb-4 text-base md:text-lg font-medium transition-all duration-300 relative ${
              activeTab === cat ? "text-orange-500" : "text-gray-500 hover:text-black"
            }`}
          >
            {cat}
            {activeTab === cat && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {Array.isArray(products) && products.map((item) => (
          <div key={item.id} className="group cursor-pointer text-center flex flex-col h-full">
            <div className="bg-[#F8F9FA] rounded-sm p-4 md:p-8 mb-4 md:mb-6 h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden">
              <img 
                src={`${item.img}`} 
                alt={item.name} 
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <h3 className="text-gray-700 text-base md:text-lg font-medium mb-2 px-2">
              {item.name}
            </h3>
            
            <div className="mt-auto flex items-center justify-center gap-3 text-[#333] font-bold text-lg md:text-xl">
              <span>{item.price} AZN</span>
          
              <FaRegHeart 
                onClick={() => handleWishlist(item)} 
                className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}