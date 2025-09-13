"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        setWatchlist(snap.data().watchlist || []);
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return <p>Avval login qiling</p>;
  }

  if (watchlist.length === 0) {
    return <p>📌 Hozircha hech narsa qo‘shilmagan</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📌 Keyinroq ko‘raman</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {watchlist.map((movie) => (
          <Link key={movie.id} href={`/Movie/${movie.id}`}>
            <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img
                src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="p-2">
                <h2 className="font-semibold truncate">{movie.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
