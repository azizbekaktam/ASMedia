"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function LikesPage() {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchLikes = async () => {
      const user = auth.currentUser;
      if (!user) {
        alert("Avval login qiling!");
        return;
      }
      const ref = collection(db, "users", user.uid, "likes");
      const snapshot = await getDocs(ref);
      setLikes(snapshot.docs.map((doc) => doc.data()));
    };

    fetchLikes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">❤️ My Liked Movies</h1>
      {likes.length === 0 ? (
        <p>Hech qanday like qilingan kino yo‘q</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {likes.map((movie) => (
            <div key={movie.id} className="p-2 border rounded">
              <h2 className="font-semibold">{movie.title}</h2>
              <p>{movie.release_date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
