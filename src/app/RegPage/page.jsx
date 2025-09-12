"use client";
import { useState } from "react";
import { auth, db } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      // 🔹 Avval email mavjudligini tekshirish
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.length > 0) {
        if (methods.includes("password")) {
          setError("Bu email allaqachon ro‘yxatdan o‘tgan. Iltimos, login qiling.");
        } else {
          setError(
            `Bu email boshqa usul bilan ro‘yxatdan o‘tgan (${methods.join(
              ", "
            )}). Shu usul bilan kiring.`
          );
        }
        return;
      }

      // 🔹 Agar email bo‘sh bo‘lsa → yangi user yaratamiz
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🔹 Firestore ga yozish
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",
        plan: "free",
        createdAt: new Date().toISOString(),
      });

      router.push("/LoginPage");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/invalid-email") {
        setError("Email formati noto‘g‘ri.");
      } else if (err.code === "auth/weak-password") {
        setError("Parol juda zaif (kamida 6 ta belgi bo‘lishi kerak).");
      } else {
        setError("Ro‘yxatdan o‘tishda xatolik ❌");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Register
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none p-3 w-full mb-4 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none p-3 w-full mb-4 rounded-lg"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Register
        </button>
        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        <p className="mt-6 text-sm text-center text-gray-600">
          Allaqachon akkauntingiz bormi?{" "}
          <Link href="/LoginPage" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
