"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");  //mor_2314
  const [password, setPassword] = useState("");    //83r5^_
  const [error, setError] = useState(null);

  async function login(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Login}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username.slice(0, 1).toUpperCase());
      router.push("/Movies?page=1");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Login
      </h2>
      <form onSubmit={login} className="space-y-6">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Yangi foydalanuvchimisiz?{" "}
          <Link href="/RegPage" className="text-indigo-600 hover:underline">
            Ro‘yxatdan o‘tish
          </Link>
        </p>
      </form>

      {error && (
        <p className="mt-6 text-center text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}
