"use client";

import React, { useState } from 'react';
import axios from 'axios';


export default function ContactForm() {

  const [formData, setFormData] = useState({ fullname: '', phone: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
   e.preventDefault();
   try {
    const response = await axios.post ('http://localhost/don-corleone-api/save_contact.php', formData);
    if (response.data.status === 'success') {
      setStatus('Məlumatlarınız göndərildi. Sizinlə tezliklə əlaqə saxlanılacaq!');
      setFormData({fullname: '', phone: '', message: ''});
    }
      
      }
        catch (error) {
        setStatus('Xeta Baş Verdi Yenidən Yoxlayın');
      
   }
   

}

  return (
    <div className='max-w-xl mx-auto my-10 p-6 bg-white shadow-lg rounded-xl border border-gray-100'>
      <h2 className='text-2xl text-gray-950 font-bold cursor-pointer text-center mb-6'>SİZİNLƏ ƏLAQƏ SAXLAYAQ?</h2>
      
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Ad Soyad"
          className="w-full p-3 border rounded-lg outline-none text-black focus:ring-2 focus:ring-green-500"
          value={formData.fullname}
          onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
          required
        />
        
        <input
          type="text"
          placeholder="Əlaqə nömrəsi"
          className="w-full p-3 border rounded-lg outline-none text-black focus:ring-2 focus:ring-green-500"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />

        <textarea
          placeholder="Mesajınız"
          className="w-full p-3 border rounded-lg outline-none text-black focus:ring-2 focus:ring-green-500 h-24"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-bold p-3 cursor-pointer rounded-lg text-white transition ${
            loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'GÖNDƏRİLİR...' : 'GÖNDƏR'}
        </button>
      </form>

      {status && (
        <p className={`mt-4 text-center font-semibold ${status.includes('Xəta') ? 'text-red-600' : 'text-green-600'}`}>
          {status}
        </p>
      )}
    </div>
  )
}
