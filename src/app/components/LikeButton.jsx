"use client";

import { useState, useEffect } from "react";

export default function LikeButton({ item, token }) {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    if (!token) return;
    const userCartKey = `cart_${token}`;
    const cart = JSON.parse(localStorage.getItem(userCartKey)) || [];
    const exists = cart.some(el => el.id === item.id && el.type === item.type);
    setInCart(exists);
  }, [item, token]);

  const handleClick = () => {
    if (!token) return alert("Iltimos, avval login qiling!");
    const userCartKey = `cart_${token}`;
    const cart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    if (inCart) {
      const newCart = cart.filter(el => !(el.id === item.id && el.type === item.type));
      localStorage.setItem(userCartKey, JSON.stringify(newCart));
      setInCart(false);
    } else {
      cart.push(item);
      localStorage.setItem(userCartKey, JSON.stringify(cart));
      setInCart(true);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`mt-6 px-6 py-3 rounded-lg font-semibold transition-colors ${
        inCart ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-500 hover:bg-green-600 text-white"
      }`}
    >
      {inCart ? "❌ Savatdan o‘chirish" : "❤️ Savatga qo‘shish"}
    </button>
  );
}
