"use client";
import { useState, useEffect } from "react";

const getAppData = () => {
  const data = localStorage.getItem("asmedia.local");
  if (data) {
    const parsed = JSON.parse(data);
    return {
      token: parsed.token || null,
      likedItems: parsed.likedItems || [],
    };
  }
  return { token: null, likedItems: [] };
};

const saveAppData = (data) => {
  localStorage.setItem("asmedia.local", JSON.stringify(data));
};

export default function LikeButton({ movieId }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const items = getAppData().likedItems;
    setLiked(items.includes(movieId));
  }, [movieId]);

  const toggleLike = () => {
    const data = getAppData();
    let items = [...data.likedItems];

    if (items.includes(movieId)) {
      items = items.filter((id) => id !== movieId);
      setLiked(false);
    } else {
      items.push(movieId);
      setLiked(true);
    }

    data.likedItems = items;
    saveAppData(data);
  };

  return (
    <button
      onClick={toggleLike}
      style={{
        padding: "8px 12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        background: liked ? "red" : "white",
        color: liked ? "white" : "black",
        cursor: "pointer",
      }}
    >
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
}
