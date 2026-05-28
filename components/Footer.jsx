'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [contactInfo, setContactInfo] = useState([]);

  useEffect(() => {
    axios.get("http://localhost/don-corleone-api/get_contact_info.php")
      .then(res => setContactInfo(Array.isArray(res.data) ? res.data : []))
      .catch(err => console.error(err));
  }, []);

  const getInfo = (type) => contactInfo.find(c => c.type === type);
  const phone = getInfo('phone');
  const email = getInfo('email');
  const address = getInfo('address');
  const facebook = getInfo('facebook');
  const instagram = getInfo('instagram');
  const youtube = getInfo('youtube');
  const linkedin = getInfo('linkedin');

  return (
    <footer className="bg-[#1a1a1a] text-[#e5e5e5] pt-16 pb-8 px-4 font-sans border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        <div>
          <h3 className="text-white text-lg font-bold mb-6 tracking-wider uppercase">ŞİRKƏT</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="/about" className="hover:text-green-500 transition-colors duration-300">Haqqımızda</Link></li>
            <li><Link href="/news" className="hover:text-green-500 transition-colors duration-300">Xəbərlər</Link></li>
            <li><Link href="/vacansion" className="hover:text-green-500 transition-colors duration-300">Vakansiyalar</Link></li>
            <li><Link href="/blog" className="hover:text-green-500 transition-colors duration-300">Bloq</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-bold mb-6 tracking-wider uppercase">MÜŞTƏRİ ÜÇÜN</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="/contact" className="hover:text-green-500 transition-colors duration-300">Əlaqə</Link></li>
            <li><Link href="/about" className="hover:text-green-500 transition-colors duration-300">Haqqımızda</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-bold mb-6 tracking-wider uppercase">ƏLAQƏ</h3>
          <ul className="space-y-5 text-sm">
            {phone && (
              <li className="flex items-center gap-3 group">
                <FaPhone className="text-xl text-green-500 group-hover:scale-110 transition-transform" />
                <span>{phone.value}</span>
              </li>
            )}
            {email && (
              <li className="flex items-center gap-3 group">
                <FaEnvelope className="text-xl text-orange-500 group-hover:scale-110 transition-transform" />
                <span>{email.value}</span>
              </li>
            )}
            {address && (
              <li className="flex items-center gap-3 group">
                <FaMapMarkerAlt className="text-xl text-red-500 group-hover:scale-110 transition-transform" />
                <Link href="/contact" className="hover:text-green-500 transition-colors uppercase tracking-tight text-xs">{address.value}</Link>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-bold mb-6 tracking-wider uppercase">BİZİ İZLƏYİN</h3>
          <div className="flex gap-4">
            {facebook && (
              <a href={facebook.value} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                <FaFacebookF />
              </a>
            )}
            {instagram && (
              <a href={instagram.value} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 hover:text-white transition-all duration-300">
                <FaInstagram />
              </a>
            )}
            {youtube && (
              <a href={youtube.value} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
                <FaYoutube />
              </a>
            )}
            {linkedin && (
              <a href={linkedin.value} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                <FaLinkedinIn />
              </a>
            )}
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