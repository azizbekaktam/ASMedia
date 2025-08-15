"use client";

import { useEffect, useState } from "react";
import Search from "./Search";

export default function Navbar() {
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };
  useEffect(() => {
    // localStorage dan username ni olish
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white px-6 py-3">
      <div className="font-bold text-lg">LOGO</div>

      <ul className="flex gap-6">
        <li className="hover:text-yellow-400 cursor-pointer">Home</li>
        <li className="hover:text-yellow-400 cursor-pointer">Movies</li>
        <li className="hover:text-yellow-400 cursor-pointer">Cinema</li>
      </ul>

      <div className="flex items-center gap-3">
        <Search />
        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-sm">
          {username ? username[0].toUpperCase() : "?"}
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-1 bg-red-600 hover:bg-red-500 rounded text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
