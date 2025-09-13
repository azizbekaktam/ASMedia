"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/firebase";  // sizning firebase config faylingiz
import { useAuth } from "@/app/context/AuthContext"; // agar auth context bo‘lsa

export default function WatchlistButton({ movie }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { user } = useAuth(); // foydalanuvchi

  useEffect(() => {
    if (!user || !movie?.id) return;

    const fetchWatchlist = async () => {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const hasMovie = data.watchlist?.some((m) => m.id === movie.id);
        setIsInWatchlist(hasMovie);
      }
    };

    fetchWatchlist();
  }, [user, movie]);

  const toggleWatchlist = async () => {
    if (!user) {
      alert("Iltimos, avval login qiling");
      return;
    }

    const userRef = doc(db, "users", user.uid);

    if (isInWatchlist) {
      await updateDoc(userRef, {
        watchlist: arrayRemove(movie),
      });
      setIsInWatchlist(false);
    } else {
      await setDoc(
        userRef,
        { watchlist: arrayUnion(movie) },
        { merge: true }
      );
      setIsInWatchlist(true);
    }
  };

  return (
    <button
      onClick={toggleWatchlist}
      className={`px-4 py-2 rounded-lg mt-4 ${
        isInWatchlist ? "bg-red-500 text-white" : "bg-blue-500 text-white"
      }`}
    >
      {isInWatchlist ? "❌ Olib tashlash" : "➕ Keyinroq ko‘raman"}
    </button>
  );
}
