"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { doc, onSnapshot, setDoc, deleteDoc } from "firebase/firestore";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function WatchlistButton({ movie }) {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "users", user.uid, "watchlist", String(movie.id));

    const unsubscribe = onSnapshot(ref, (docSnap) => {
      setInWatchlist(docSnap.exists());
    });

    return () => unsubscribe();
  }, [user, movie.id]);

  const toggleWatchlist = async () => {
    if (!user) {
      alert("Avval login qiling!");
      return;
    }

    const ref = doc(db, "users", user.uid, "watchlist", String(movie.id));

    if (inWatchlist) {
      await deleteDoc(ref);
    } else {
      await setDoc(ref, {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
      });
    }
  };

  return (
    <button
      onClick={toggleWatchlist}
      className={`px-3 py-1 rounded flex gap-2 items-center ${
        inWatchlist ? "bg-yellow-500 text-white" : "bg-gray-200"
      }`}
    >
      {inWatchlist ? <FaBookmark /> : <FaRegBookmark />}
      {inWatchlist ? "Watchlisted" : "Watchlist"}
    </button>
  );
}
