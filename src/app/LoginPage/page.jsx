"use client";
import { useState } from "react";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔑 Firebase token olish
      const token = await user.getIdToken();

      // LocalStorage ga saqlash
      localStorage.setItem("token", token);

      router.push("/Movies");
    } catch (err) {
      setError("Email yoki parol noto‘g‘ri ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none p-3 w-full mb-4 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none p-3 w-full mb-4 rounded-lg"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Login
        </button>
        {error && (
          <p className="text-red-500 text-center mt-3">{error}</p>
        )}
        <p className="mt-6 text-sm text-center text-gray-600">
          Hali ro‘yxatdan o‘tmaganmisiz?{" "}
          <Link href="/RegPage" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
