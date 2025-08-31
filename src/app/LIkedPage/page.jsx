"use client";
import { useEffect, useState } from "react";

// LocalStorage helperlari
const getAppData = () => {
  const data = localStorage.getItem("asmedia.local");
  return data ? JSON.parse(data) : { token: null, likedItems: [] };
};

const saveAppData = (data) => {
  localStorage.setItem("asmedia.local", JSON.stringify(data));
};

export default function LikedPage() {
  const [likedItems, setLikedItems] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const data = getAppData();
    setLikedItems(data.likedItems || []);
    setToken(data.token || null);
  }, []);

  const removeLike = (id) => {
    const data = getAppData();
    const updated = data.likedItems.filter((item) => item !== id);
    data.likedItems = updated;
    saveAppData(data);
    setLikedItems(updated);
  };

  return (
    <div>
      <h1>❤️ Liked Page</h1>
      <p><strong>Token:</strong> {token || "Token yo‘q"}</p>

      {likedItems.length > 0 ? (
        <ul>
          {likedItems.map((id) => (
            <li key={id}>
              Item {id}{" "}
              <button onClick={() => removeLike(id)}>❌ Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Liked yo‘q</p>
      )}
    </div>
  );
}
