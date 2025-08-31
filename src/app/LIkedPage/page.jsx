"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import Spinder from "../components/Spinder";
import { FaRegHeart } from "react-icons/fa";

export default function LikesPage() {
  const [likes, setLikes] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchLikes = async () => {
      if (!user) return;
      const ref = collection(db, "users", user.uid, "likes");
      const snapshot = await getDocs(ref);
      setLikes(snapshot.docs.map((doc) => doc.data()));
    };
    fetchLikes();
  }, [user]);

  if (loading) return <p><Spinder/></p>;
  if (!user) return <p>Avval login qiling!</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4"><FaRegHeart /> My Liked Movies</h1>
      {likes.length === 0 ? (
        <p>Hech qanday like qilingan kino yo‘q</p>
      ) : (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
  {likes.map((movie) => (
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

        <a
          href={`/Movies/${movie.id}`}
          className="inline-block px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Details
        </a>
      </div>
    </div>
  ))}
</div>
      )}
    </div>
  );
}
