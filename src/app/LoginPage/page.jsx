"use client";
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter, Link } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/Movies"); // Login muvaffaqiyatli bo‘lsa Home ga yo‘naltiradi
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <p className="mt-4 text-sm">
        Hali ro‘yxatdan o‘tmaganmisiz? <Link href="/RegPage" className="text-blue-600 underline">Register</Link>
      </p>
    </div>
  );
}
