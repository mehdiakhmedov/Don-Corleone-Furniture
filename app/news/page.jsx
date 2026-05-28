'use client';
import { useState, useEffect } from "react";
import axios from "axios";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost/don-corleone-api/get_news.php")
      .then(res => { setNews(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-24 font-bold text-gray-500 text-lg animate-pulse">Yüklənir...</div>;

  return (
    <div className="w-full bg-gray-50 pb-20">
      <div className="text-center py-16 bg-white border-b border-gray-100 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">Xəbərlər</h1>
        <p className="mt-3 text-gray-500 text-sm md:text-base max-w-md mx-auto">Don Corleone keyfiyyəti haqqında ən son xəbərlər</p>
      </div>
      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map(item => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <img src={`/${item.image}`} alt={item.title} className="w-full h-[250px] object-cover" />
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-2">{new Date(item.created_at).toLocaleDateString('az-AZ')}</p>
                <h2 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}