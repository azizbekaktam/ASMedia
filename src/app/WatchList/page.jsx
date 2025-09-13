"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(stored);
  }, []);

  if (watchlist.length === 0) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white p-6">
        <BackButton />
        <h1 className="text-3xl font-bold mb-6">📌 Keyinroq ko‘raman</h1>
        <p>Hozircha hech qanday kino qo‘shilmagan 😔</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white p-6">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">📌 Keyinroq ko‘raman</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {watchlist.map((movie) => (
          <Link
            key={movie.id}
            href={`/Movie/${movie.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-2">
              <h2 className="font-semibold truncate">{movie.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {movie.release_date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
