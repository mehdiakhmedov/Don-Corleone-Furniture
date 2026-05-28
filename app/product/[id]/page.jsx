'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id; 

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    if (productId && productId !== "undefined") {
      setLoading(true);
      setApiError(null);
      
      axios.get(`http://localhost/don-corleone-api/get_furniture_detail.php?id=${productId}`)
        .then(res => {
        
          if (res.data && res.data.status === "error") {
            setApiError(res.data.message);
            setProduct(null);
          } else if (res.data && res.data.id) {
            
            setProduct(res.data);
          } else {
            setApiError("Backend-dən gözlənilməz boş data gəldi.");
            setProduct(null);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Məhsul yüklənərkən xəta:", err);
          setApiError(`Şəbəkə və ya Server xətası: ${err.message}`);
          setProduct(null);
          setLoading(false);
        });
    }
  }, [productId]);

  useEffect(() => {
    if (product?.id) {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setInWishlist(wishlist.some(item => item.id === product.id));
    }
  }, [product]);

  const handleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.findIndex(item => item.id === product.id);
    if (index > -1) {
      wishlist.splice(index, 1);
      setInWishlist(false);
    } else {
      wishlist.push({
        id: product.id,
        name: product.name,
        img: `/${product.image}`,
        price: product.price
      });
      setInWishlist(true);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlistUpdate"));
  };

  
  if (loading) {
    return (
      <div className="text-center py-24 font-bold text-gray-500 text-lg animate-pulse">
        Məhsul detalları yüklənir...
      </div>
    );
  }

 
  if (apiError) {
    return (
      <div className="text-center py-24 bg-red-50/50 min-h-screen flex flex-col justify-center items-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Sistem Xətası</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">{apiError}</p>
          <Link href="/product" className="bg-gray-900 hover:bg-orange-600 text-white text-sm font-medium px-6 py-3 rounded-xl transition-colors">
            Kataloqa geri dön
          </Link>
        </div>
      </div>
    );
  }

  
  if (!product) {
    return (
      <div className="text-center py-24 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800">Məhsul tapılmadı!</h2>
        <p className="text-gray-500 mt-2 text-sm">ID: {productId}</p>
        <Link href="/product" className="text-orange-600 font-medium underline mt-4 inline-block">
          Kataloqa geri dön
        </Link>
      </div>
    );
  }

  const hasDiscount = product.old_price && Number(product.old_price) > Number(product.price);

  return (
    <div className="w-full bg-white pb-20 pt-8">
      <div className="container mx-auto px-4">
        
       
        <div className="mb-8">
          <Link href="/product" className="text-gray-500 hover:text-orange-600 text-sm font-medium transition-colors">
            ← Məhsullara geri dön
          </Link>
        </div>

      
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          
          <div className="w-full lg:w-1/2 relative bg-gray-50 rounded-3xl overflow-hidden shadow-sm">
            <img 
              src={`/${product.image}`}
              alt={product.name} 
              className="w-full h-[320px] md:h-[500px] object-cover"
            />
            {hasDiscount && (
              <span className="absolute top-6 left-6 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md">
                Xüsusi Endirim
              </span>
            )}
          </div>

         
          <div className="w-full lg:w-1/2 flex flex-col text-left">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1.5 rounded-md inline-block w-fit mb-4">
              {product.category}
            </span>
            
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {product.name}
            </h1>

          
            <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-gray-100">
              <span className="text-2xl md:text-3xl font-black text-orange-600">
                {product.price} AZN
              </span>
              {hasDiscount && (
                <span className="text-gray-400 line-through text-base md:text-lg">
                  {product.old_price} AZN
                </span>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">Məhsul Haqqında:</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed font-light">
                {product.description}
              </p>
            </div>

        
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={handleWishlist}
                className={`flex-1 cursor-pointer font-bold py-4 rounded-xl transition-all text-sm md:text-base flex items-center justify-center gap-2 ${
                  inWishlist
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {inWishlist ? <FaHeart className="text-white" /> : <FaRegHeart />}
                {inWishlist ? 'Bəyənildi ✓' : 'Səbətə Əlavə Et'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}