"use client"; // agar Next.js 13 App Router ishlatsa kerak bo‘ladi
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // icon kutubxonasi

export default function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  // Bosilganda dark/class qo‘shiladi yoki o‘chadi
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full transition-colors
                 bg-gray-200 text-gray-800 hover:bg-gray-300
                 dark:bg-gray-700 dark:text-yellow-400 dark:hover:bg-gray-600"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
