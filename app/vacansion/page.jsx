'use client';
import { useState, useEffect } from "react";
import axios from "axios";

export default function VacansionPage() {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost/don-corleone-api/get_vacancies.php")
      .then(res => { setVacancies(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-24 font-bold text-gray-500 text-lg animate-pulse">Yüklənir...</div>;

  return (
    <div className="w-full bg-gray-50 pb-20">
      <div className="text-center py-16 bg-white border-b border-gray-100 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">Vakansiyalar</h1>
        <p className="mt-3 text-gray-500 text-sm md:text-base max-w-md mx-auto">Don Corleone ailəsinə qoşulun</p>
      </div>
      <div className="container mx-auto px-4 mt-12 max-w-4xl">
        {vacancies.length === 0 ? (
          <p className="text-center text-gray-500">Hazırda aktiv vakansiya yoxdur.</p>
        ) : (
          <div className="space-y-6">
            {vacancies.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800">{item.title}</h2>
                  {item.salary && <span className="bg-green-50 text-green-700 font-bold px-4 py-2 rounded-lg text-sm">{item.salary}</span>}
                </div>
                <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">{item.description}</p>
                {item.requirements && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-sm font-bold text-gray-800 mb-2">Tələblər:</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{item.requirements}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}