"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";

export default function LikeButton({ movie }) {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    async function checkCart() {
      const user = auth.currentUser;
      if (!user) return;
      const cartSnapshot = await getDocs(collection(db, "users", user.uid, "cart"));
      const exists = cartSnapshot.docs.some(doc => doc.id === movie.id.toString());
      setInCart(exists);
    }
    checkCart();
  }, [movie]);

  const handleClick = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Iltimos, avval login qiling!");
    const docRef = doc(db, "users", user.uid, "cart", movie.id.toString());
    if (inCart) {
      await deleteDoc(docRef);
      setInCart(false);
    } else {
      await setDoc(docRef, movie);
      setInCart(true);
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
