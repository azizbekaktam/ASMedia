"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import Spinder from "@/app/components/Spinder";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Savatni olish
  useEffect(() => {
    async function fetchCart() {
      const user = auth.currentUser;
      if (!user) {
        setCart([]);
        setLoading(false);
        return;
      }
      const querySnapshot = await getDocs(collection(db, "users", user.uid, "cart"));
      setCart(querySnapshot.docs.map(doc => doc.data()));
      setLoading(false);
    }
    fetchCart();
  }, []);

  // Savatdan o‘chirish
  const handleRemove = async (movieId) => {
    const user = auth.currentUser;
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "cart", movieId.toString()));
    const querySnapshot = await getDocs(collection(db, "users", user.uid, "cart"));
    setCart(querySnapshot.docs.map(doc => doc.data()));
  };

  if (loading) return <p className="text-white p-6"><Spinder /></p>;
  if (cart.length === 0) return <p className="text-white p-6">Savat bo‘sh 😢</p>;

  return (
    <main className="bg-gray-100 dark:bg-black text-gray-900 dark:text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">📌 Mening Savatim</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cart.map(movie => (
          <div key={movie.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
            <img
              src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-yellow-500 font-semibold mt-1">⭐ {movie.vote_average}</p>
              </div>
              <button
                onClick={() => handleRemove(movie.id)}
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
