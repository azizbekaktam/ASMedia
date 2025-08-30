"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import LikeButton from "./LikeButton";

export default function SavatPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchCart() {
      const user = auth.currentUser;
      if (!user) return;
      try {
        const snapshot = await getDocs(collection(db, "users", user.uid, "cart"));
        const items = snapshot.docs.map(doc => doc.data());
        setCartItems(items);
      } catch (error) {
        console.error("Firestore fetch cart error:", error);
      }
    }

    fetchCart();
  }, []);

  const handleRemove = async (movieId) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "cart", movieId.toString()));
      setCartItems(prev => prev.filter(item => item.id !== movieId));
    } catch (error) {
      console.error("Firestore remove error:", error);
      alert("Xatolik yuz berdi!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Savat</h1>
      {cartItems.length === 0 && <p>Savat bo‘sh</p>}
      {cartItems.map(movie => (
        <div key={movie.id} className="mb-4 p-4 border rounded-lg flex justify-between items-center">
          <div>
            <h2 className="font-semibold">{movie.title}</h2>
          </div>
          <div className="flex gap-2">
            <LikeButton movie={movie} />
            <button
              onClick={() => handleRemove(movie.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              ❌ O‘chirish
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
