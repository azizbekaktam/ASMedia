"use client";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    if (!username || !password) {
      setMessage("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    setMessage(`✅ ${username} muvaffaqiyatli ro'yxatdan o'tdi!`);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
          Ro'yxatdan o'tish
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
        >
          Ro'yxatdan o'tish
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-green-700">{message}</p>
        )}

        <p className="mt-6 text-center text-green-600">
          Allaqachon hisobingiz bormi?{" "}
          <Link
            href="/LoginPage"
            className="underline font-semibold hover:text-green-800"
          >
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
}
