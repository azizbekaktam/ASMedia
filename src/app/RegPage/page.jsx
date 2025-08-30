"use client";
import { useState } from "react";
import { auth } from "../../../firebase"; // firebase config faylingiz
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(user);
      setMessage("✅ Ro‘yxatdan o‘tdingiz! Emailingizga tasdiqlash xati yuborildi.");
    } catch (error) {
      setMessage("❌ Xatolik: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form 
        onSubmit={handleRegister} 
        className="bg-white p-6 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Ro‘yxatdan o‘tish</h2>
        
        <input 
          type="email" 
          placeholder="Email kiriting"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input 
          type="password" 
          placeholder="Parol kiriting"
          className="w-full p-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Ro‘yxatdan o‘tish
        </button>

        {message && <p className="mt-3 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
}
