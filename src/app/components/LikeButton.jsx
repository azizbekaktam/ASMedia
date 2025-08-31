"use client";
import { useState, useEffect } from "react";

// LocalStorage helperlari
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

export default function LikeButton({ itemId }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const items = getLikedItems();
    setLiked(items.includes(itemId));
  }, [itemId]);

  const toggleLike = () => {
    let items = getLikedItems();
    if (items.includes(itemId)) {
      items = items.filter((id) => id !== itemId);
      setLiked(false);
    } else {
      items.push(itemId);
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
        margin: "5px"
      }}
    >
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
}
