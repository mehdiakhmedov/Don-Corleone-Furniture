'use client';
import { useState, useEffect } from "react";
import axios from "axios";

export default function AboutPage() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost/don-corleone-api/get_about.php")
      .then(res => { setAbout(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-24 font-bold text-gray-500 text-lg animate-pulse">Yüklənir...</div>;
  if (!about || about.status === "error") return <div className="text-center py-24 text-gray-500">Məlumat tapılmadı</div>;

  return (
    <div className="w-full bg-white pb-20">
      <div className="relative w-full h-[400px] bg-gray-100">
        <img src={`/${about.image}`} alt={about.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center px-4">{about.title}</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 max-w-4xl">
        <div className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">{about.content}</div>
      </div>
    </div>
  );
}