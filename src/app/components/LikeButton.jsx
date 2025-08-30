"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase"; // to‘g‘ri pathni tekshiring
import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";

export default function LikeButton({ movie }) {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    async function checkCart() {
      const user = auth.currentUser;
      if (!user) return;
      try {
        const cartSnapshot = await getDocs(collection(db, "users", user.uid, "cart"));
        const exists = cartSnapshot.docs.some(doc => doc.id === movie.id.toString());
        setInCart(exists);
      } catch (error) {
        console.error("Firestore read error:", error);
      }
    }
    checkCart();
  }, [movie]);

  const handleClick = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Iltimos, avval login qiling!");

    const docRef = doc(db, "users", user.uid, "cart", movie.id.toString());

    try {
      if (inCart) {
        await deleteDoc(docRef);
        setInCart(false);
      } else {
        await setDoc(docRef, movie);
        setInCart(true);
      }
    } catch (error) {
      console.error("Firestore write error:", error);
      alert("Ma’lumot saqlashda xatolik yuz berdi. Internetni tekshiring.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`mt-6 px-6 py-3 rounded-lg font-semibold transition-colors ${
        inCart ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"
      }`}
    >
      {inCart ? "❌ Savatdan o‘chirish" : "❤️ Savatga qo‘shish"}
    </button>
  );
}
