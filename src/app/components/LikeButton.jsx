"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

export default function LikeButton({ movie }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const checkLike = async () => {
      const ref = doc(db, "users", user.uid, "likes", String(movie.id));
      const snap = await getDoc(ref);
      setLiked(snap.exists());
    };

    checkLike();
  }, [movie.id]);

  const toggleLike = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Avval login qiling!");
      return;
    }

    const ref = doc(db, "users", user.uid, "likes", String(movie.id));

    if (liked) {
      await deleteDoc(ref);
      setLiked(false);
    } else {
      await setDoc(ref, {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
      });
      setLiked(true);
    }
  };

  return (
    <button
      onClick={toggleLike}
      className={`px-3 py-1 rounded ${
        liked ? "bg-red-500 text-white" : "bg-gray-200"
      }`}
    >
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
}
