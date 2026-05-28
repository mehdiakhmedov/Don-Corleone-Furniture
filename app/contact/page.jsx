'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import ContactForm from "@/components/ContactForm";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost/don-corleone-api/get_contact_info.php")
      .then(res => { setContactInfo(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const iconMap = { FaPhone: <FaPhone className="text-green-500 text-xl" />, FaEnvelope: <FaEnvelope className="text-orange-500 text-xl" />, FaMapMarkerAlt: <FaMapMarkerAlt className="text-red-500 text-xl" /> };
  const contacts = contactInfo.filter(c => ['phone', 'email', 'address'].includes(c.type));

  return (
    <div className="w-full bg-white pb-20">
      <div className="text-center py-16 bg-gray-50 border-b border-gray-100 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">Əlaqə</h1>
        <p className="mt-3 text-gray-500 text-sm md:text-base">Bizimlə əlaqə saxlayın</p>
      </div>
      <div className="container mx-auto px-4 mt-12 max-w-5xl">
        {!loading && contacts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contacts.map(item => (
              <div key={item.id} className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                <div className="flex justify-center mb-3">{iconMap[item.icon] || null}</div>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-1">{item.label}</h3>
                <p className="text-gray-600 text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        )}
        <ContactForm />
      </div>
    </div>
  );
}