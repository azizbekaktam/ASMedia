import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { doc, onSnapshot, setDoc, deleteDoc } from "firebase/firestore";

export default function LikeButton({ movie }) {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);

  // Login holatini real-time kuzatish
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "users", user.uid, "likes", String(movie.id));

    // Real-time liked state
    const unsubscribe = onSnapshot(ref, (docSnap) => {
      setLiked(docSnap.exists());
    });

    return () => unsubscribe();
  }, [user, movie.id]);

  const toggleLike = async () => {
    if (!user) {
      alert("Avval login qiling!");
      return;
    }

    const ref = doc(db, "users", user.uid, "likes", String(movie.id));

    if (liked) {
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
      onClick={toggleLike}
      className={`px-3 py-1 rounded ${
        liked ? "bg-red-500 text-white" : "bg-gray-200"
      }`}
    >
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
}
