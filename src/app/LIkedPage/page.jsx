"use client";

import { useEffect, useState } from "react";

// LocalStorage helper funksiyalar
const getData = (key) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

const saveData = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export default function LikedPage() {
  const [token, setToken] = useState(null);
  const [likedItems, setLikedItems] = useState([]);

  // sahifa ochilganda localStorage dan malumotlarni olish
  useEffect(() => {
    const storedToken = getData("token");
    const storedItems = getData("likedItems") || [];

    setToken(storedToken);
    setLikedItems(storedItems);
  }, []);

  // Like qo‘shish yoki o‘chirish
  const toggleLike = (item) => {
    let updatedItems;
    if (likedItems.some((i) => i.id === item.id)) {
      // agar bor bo‘lsa o‘chiramiz
      updatedItems = likedItems.filter((i) => i.id !== item.id);
    } else {
      // agar yo‘q bo‘lsa qo‘shamiz
      updatedItems = [...likedItems, item];
    }
    setLikedItems(updatedItems);
    saveData("likedItems", updatedItems);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Liked Page</h1>

      {/* Token chiqarish */}
      <div style={{ marginBottom: "20px" }}>
        <strong>Token:</strong> {token || "Token topilmadi"}
      </div>

      {/* Liked items ro‘yxati */}
      <div>
        <h2>Saved Items:</h2>
        {likedItems.length === 0 ? (
          <p>Hech narsa yo‘q</p>
        ) : (
          <ul>
            {likedItems.map((item) => (
              <li key={item.id} style={{ marginBottom: "10px" }}>
                {item.title || item.name}{" "}
                <button onClick={() => toggleLike(item)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Test uchun qo‘lda item qo‘shish */}
      <button
        onClick={() =>
          toggleLike({ id: 1, title: "Test Movie", name: "Test Name" })
        }
      >
        Test Like
      </button>
    </div>
  );
}
