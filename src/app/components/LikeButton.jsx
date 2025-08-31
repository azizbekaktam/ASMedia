"use client";
import { useState, useEffect } from "react";

const saveAppData = (data) => {
  localStorage.setItem("asmedia.local", JSON.stringify(data));
};

const getAppData = () => {
  const data = localStorage.getItem("asmedia.local");
  return data ? JSON.parse(data) : { token: null, likedItems: [] };
};

const saveLikedItems = (items) => {
  const data = getAppData();
  data.likedItems = items;
  saveAppData(data);
};

const getLikedItems = () => {
  const data = getAppData();
  return data.likedItems || [];
};

export default function LikeButton({ movieId }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const items = getLikedItems();
    setLiked(items.includes(movieId));
  }, [movieId]);

  const toggleLike = () => {
    let items = getLikedItems();
    if (items.includes(movieId)) {
      items = items.filter((id) => id !== movieId);
      setLiked(false);
    } else {
      items.push(movieId);
      setLiked(true);
    }
    saveLikedItems(items);
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
        margin: "5px",
      }}
    >
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
}
