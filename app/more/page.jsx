'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function MorePage() {
 
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get("http://localhost/don-corleone-api/get_collections.php")
      .then(res => {
        setCollections(res.data); 
        setLoading(false);      
      })
      .catch(err => {
        console.error("Xəta baş verdi:", err);
        setLoading(false);
      });
  }, []);


  if (loading) {
    return (
      <div className="text-center py-20 font-bold text-gray-500 text-lg">
        Mebellər yüklənir...
      </div>
    );
  }

  return (
    <div className="w-full bg-white pb-16">
      
   
      <div className="text-center py-12 bg-gray-50 px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          Rahatlıq və harmoniyanı öz evində birləşdir.
        </h1>
        <p className="mt-3 text-gray-500 text-sm md:text-base max-w-xl mx-auto">
          Geniş, model rəng seçimi ilə evinizdə rahatlıq və harmoniyanı yaradın
        </p>
      </div>

     
      <div className="container mx-auto px-4 mt-12 flex flex-col gap-16 md:gap-24">
        {collections.map((item, index) => {
         const isEven = index % 2 === 0;

          return (
            <div 
              key={item.id} 
              className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                isEven ? '' : 'md:flex-row-reverse'
              }`}
            >
        
              <div className="w-full md:w-1/2">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-[250px] md:h-[400px] object-cover rounded-2xl shadow-md" 
                />
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center text-left px-2">
                <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-5">
                  {item.subtitle}
                </p>
                <div>
                  {/* <Link 
                    href={item.btn_link}
                    className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm md:text-base transition-colors"
                  >
                    {item.btn_text}
                  </Link> */}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}