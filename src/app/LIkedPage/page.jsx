"use client";

import { useState, useEffect } from "react";
import Spinder from "@/app/components/Spinder";

export default function CartPage({ token }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return setLoading(false);
    const userCartKey = `cart_${token}`;
    const savedCart = JSON.parse(localStorage.getItem(userCartKey)) || [];
    setCart(savedCart);
    setLoading(false);
  }, [token]);

  const handleRemove = (id, type) => {
    const userCartKey = `cart_${token}`;
    const newCart = cart.filter(item => !(item.id === id && item.type === type));
    localStorage.setItem(userCartKey, JSON.stringify(newCart));
    setCart(newCart);
  };

  if (loading) return <p className="text-white p-6"><Spinder /></p>;
  if (cart.length === 0) return <p className="text-white p-6">Savat bo‘sh 😢</p>;

  return (
    <main className="bg-gray-100 dark:bg-black text-gray-900 dark:text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">📌 Mening Savatim</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cart.map(item => (
          <div key={item.id + item.type} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
            <img
              src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${item.poster_path}`}
              alt={item.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-yellow-500 font-semibold mt-1">⭐ {item.vote_average}</p>
                <p className="text-sm mt-1 italic">{item.type}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id, item.type)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                ❌ O‘chirish
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
