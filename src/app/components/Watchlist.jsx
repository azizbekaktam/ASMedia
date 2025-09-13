"use client";

import { useState, useEffect } from "react";

export default function WatchlistButton({ movie }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    setIsInWatchlist(stored.some(m => m.id === movie.id));
  }, [movie.id]);

  const toggleWatchlist = () => {
    let stored = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (isInWatchlist) {
      stored = stored.filter(m => m.id !== movie.id);
      setIsInWatchlist(false);
    } else {
      stored.push(movie);
      setIsInWatchlist(true);
    }

    localStorage.setItem("watchlist", JSON.stringify(stored));
  };

  return (
    <button
      onClick={toggleWatchlist}
      className={`px-4 py-2 rounded-lg mt-4 ${
        isInWatchlist ? "bg-red-500 text-white" : "bg-blue-500 text-white"
      }`}
    >
      {isInWatchlist ? "❌ Keyinroqdan olib tashlash" : "➕ Keyinroq ko‘raman"}
    </button>
  );
}
