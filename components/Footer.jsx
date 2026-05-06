import React from 'react';
import Link from 'next/link';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedinIn, 
  FaWhatsapp, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-[#e5e5e5] pt-16 pb-8 px-4 font-sans border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        
        <div>
          <h3 className="text-white text-lg font-bold mb-6 tracking-wider uppercase">ŞİRKƏT</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link href="/about" className="hover:text-green-500 transition-colors duration-300">Haqqımızda</Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-green-500 transition-colors duration-300">Xəbərlər</Link>
            </li>
            <li>
              <Link href="/vacansion" className="hover:text-green-500 transition-colors duration-300">Vakansiyalar</Link>
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-white text-lg font-bold mb-6 tracking-wider uppercase">MÜŞTƏRİ ÜÇÜN</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link href="/onlineshopping" className="hover:text-green-500 transition-colors duration-300">Onlayn alış qaydaları</Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-green-500 transition-colors duration-300">FAQ</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-green-500 transition-colors duration-300">Bloq</Link>
            </li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-white text-lg font-bold mb-6 tracking-wider uppercase">ƏLAQƏ</h3>
          <ul className="space-y-5 text-sm">
            <li className="flex items-center gap-3 group">
              <FaWhatsapp className="text-xl text-green-500 group-hover:scale-110 transition-transform" />
              <Link href="https://wa.me/99450XXXXXXX" className="hover:text-green-500 transition-colors">WhatsApp</Link>
            </li>
            <li className="flex items-center gap-3 group">
              <FaMapMarkerAlt className="text-xl text-red-500 group-hover:scale-110 transition-transform" />
              <Link href="/unvanlar" className="hover:text-green-500 transition-colors uppercase tracking-tight text-xs">Ünvanlar</Link>
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-white text-lg font-bold mb-6 tracking-wider uppercase">BİZİ İZLƏYİN</h3>
          <div className="flex gap-4">
            <Link href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
              <FaFacebookF />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 hover:text-white transition-all duration-300">
              <FaInstagram />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
              <FaYoutube />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-center">
        <p className="text-xs text-gray-500 tracking-widest uppercase">
          &copy; {currentYear} DON CORLEONE — BÜTÜN İSTİFADƏÇİ HÜQUQLARI QORUNUR
        </p>
      </div>
    </footer>
  );
};

export default Footer;