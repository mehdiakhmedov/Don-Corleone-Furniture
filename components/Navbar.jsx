'use client'

import { useState, useEffect } from "react"; 
import Link from "next/link";
import { FaRegHeart, FaTimes, FaTrash } from "react-icons/fa"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);

  const updateWishlistCount = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistCount(wishlist.length);
    setWishlistItems(wishlist); 
  };

  useEffect(() => {
    updateWishlistCount();
    window.addEventListener("wishlistUpdate", updateWishlistCount);
    return () => {
      window.removeEventListener("wishlistUpdate", updateWishlistCount);
    };
  }, []);

 
  const removeFromWishlist = (id) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(item => item.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    window.dispatchEvent(new Event("wishlistUpdate"));
  };

  const displayCount = wishlistCount > 9 ? "9+" : wishlistCount;

  return (
    <nav className="w-full bg-amber-100 sticky top-0 py-4 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        
        <div className="flex-none">
            <img src="/donlogo.png" alt="Don Corleone" className="w-[80px] cursor-pointer" />
        </div>

        <ul className="hidden lg:flex gap-8 font-bold text-gray-700">
          <li className="hover:text-orange-600 transition"><Link href="/">Ana Səhifə</Link></li>
          <li className="hover:text-orange-600 transition"><Link href="/product">Məhsullar</Link></li>
          <li className="hover:text-orange-600 transition"><Link href="/about">Haqqımızda</Link></li>
          <li className="hover:text-orange-600 transition"><Link href="/blog">Bloq</Link></li>
          <li className="hover:text-orange-600 transition"><Link href="/contact">Əlaqə</Link></li>
        </ul>

        <div className="flex items-center gap-4 lg:gap-8">
          
          <div className="hidden sm:flex relative items-center border-b border-gray-300 pb-1 w-32 xl:w-64">
            <input
              type="text"
              placeholder="Search products"
              className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
            />
            <button className="ml-2 text-gray-500 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-3 lg:gap-5">
            
     
            <div className="relative cursor-pointer" onClick={() => setIsWishlistOpen(true)}>
               <FaRegHeart className="hover:text-orange-600 cursor-pointer text-xl"/>
               
               {wishlistCount > 0 && (
                 <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                   {displayCount}
                 </span>
               )}
            </div>
            
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden block text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

     
      {isWishlistOpen && (
        <>
      
          <div className="fixed inset-0 bg-black/40 z-[60]" onClick={() => setIsWishlistOpen(false)} />
          
         
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-[70] p-5 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-lg font-bold text-gray-800">Bəyəndiklərim</h2>
              <FaTimes className="cursor-pointer hover:text-red-500" onClick={() => setIsWishlistOpen(false)} />
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
              {wishlistItems.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">Siyahınız boşdur.</p>
              ) : (
                wishlistItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 mb-4 p-2 border rounded-lg">
                    <img src={item.img} alt={item.name} className="w-16 h-16 object-contain bg-gray-50 rounded" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-700 line-clamp-1">{item.name}</h4>
                      <p className="text-orange-600 text-sm font-bold">{item.price} AZN</p>
                    </div>
                    <FaTrash 
                      className="text-gray-400 hover:text-red-500 cursor-pointer text-xs" 
                      onClick={() => removeFromWishlist(item.id)}
                    />
                  </div>
                ))
              )}
            </div>

            <button 
              className="mt-4 bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition"
              onClick={() => setIsWishlistOpen(false)}
            >
              Alış-verişə davam et
            </button>
          </div>
        </>
      )}

      {isOpen && (
        <div className="lg:hidden bg-amber-100 border-t border-amber-200 w-full">
          <ul className="flex flex-col gap-4 font-bold text-gray-700 p-6">
            <li className="hover:text-orange-600 transition" onClick={() => setIsOpen(false)}><Link href="/">Ana Səhifə</Link></li>
            <li className="hover:text-orange-600 transition" onClick={() => setIsOpen(false)}><Link href="/product">Məhsullar</Link></li>
            <li className="hover:text-orange-600 transition" onClick={() => setIsOpen(false)}><Link href="/about">Haqqımızda</Link></li>
            <li className="hover:text-orange-600 transition" onClick={() => setIsOpen(false)}><Link href="/blog">Bloq</Link></li>
            <li className="hover:text-orange-600 transition" onClick={() => setIsOpen(false)}><Link href="/contact">Əlaqə</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}