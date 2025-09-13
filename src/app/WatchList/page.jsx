"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import Spinder from "../components/Spinder";
import { FaBookmark } from "react-icons/fa";
import BackButton from "../components/BackButton";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    if (!user) return;

    try {
      const movieRef = doc(db, "users", user.uid, "watchlist", id.toString());
      await deleteDoc(movieRef);
      setWatchlist((prev) => prev.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user) return;
      const ref = collection(db, "users", user.uid, "watchlist");
      const snapshot = await getDocs(ref);
      setWatchlist(snapshot.docs.map((doc) => doc.data()));
    };
    fetchWatchlist();
  }, [user]);

  if (loading) return <p><Spinder/></p>;
  if (!user) return <p>Avval login qiling!</p>;

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FaBookmark /> My Watchlist
      </h1>

      {watchlist.length === 0 ? (
        <p>Hech qanday kino qo‘shilmagan 😔</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="text-lg font-bold mb-1 truncate">{movie.title}</h2>
                <p className="text-gray-500 mb-2">{movie.release_date}</p>

                <div className="flex gap-2">
                  <a
                    href={`/Movies/${movie.id}`}
                    className="flex-1 text-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Details
                  </a>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
