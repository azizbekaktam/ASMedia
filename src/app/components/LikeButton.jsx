import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { doc, onSnapshot, setDoc, deleteDoc } from "firebase/firestore";
import { FaHeart, FaRegHeart } from "react-icons/fa"; 

export default function LikeButton({ movie }) {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "users", user.uid, "likes", String(movie.id));

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
      {liked ? <FaHeart /> : <FaRegHeart />}
      {liked ? "Liked" : "Like"}
    </button>
  );
}
