"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const categories = [ "All", "Sofa", "Table", "Chair", "Bed", "Lightning", "Decore"]

export default function ProductTabs() {

  const [activeTab, setActiveTab] = useState("All")

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const categoryForQuery = activeTab.toLowerCase();
    
    axios
      .get(`http://localhost/don-corleone-api/get_products.php?cat=${categoryForQuery}`)
      .then((res) => {
        console.log("Gələn məlumat:", res.data);
        setProducts(res.data);
      }) 
      .catch((err) => {
        console.error("PHP linkində problem var:", err);
      });
  }, [activeTab]);



  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
      
      <div className="flex justify-center items-center space-x-12 cursor-pointer border-b border-gray-200 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
          
            
            className={`pb-4 text-lg font-medium cursor-pointer transition-all duration-300 relative ${
              activeTab === cat 
              ? "text-orange-500" 
              : "text-gray-500 hover:text-black" 
            }`}
          >
            {cat}
      
            {activeTab === cat && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {Array.isArray(products) && products.map((item) => (
          <div key={item.id} className="group cursor-pointer text-center">
            

            <div className="bg-[#F8F9FA] rounded-sm p-8 mb-6 h-[350px] flex items-center justify-center overflow-hidden">
              <img 
                src={`${item.img}`} 
                alt={item.name} 
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
         

            <h3 className="text-gray-700 text-lg font-medium mb-2 px-4">
              {item.name}
            </h3>
            <p className="text-[#333] font-bold text-xl">
               {item.price}
               <FaRegHeart />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
