'use client'

import { useState } from "react"; 
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link href="/myaccount" className="hidden md:block text-sm font-bold hover:text-orange-600 transition whitespace-nowrap">
              My Account
            </Link>
           
            <div className="relative cursor-pointer group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:text-orange-600 transition">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] rounded-full px-1.5 font-bold">0</span>
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