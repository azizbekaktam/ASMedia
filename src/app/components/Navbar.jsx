"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Search from "./Search";
import LogOut from "./LogOut";
import DarkMode from "./DarkMode";

export default function Navbar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <nav className="flex items-center justify-between 
                    bg-white text-gray-900 
                    dark:bg-gray-900 dark:text-white 
                    px-6 py-3 shadow-md transition-colors">
      {/* Logo */}
      <div className="font-bold text-lg tracking-wide">AsMedia</div>

      {/* Menu */}
      <ul className="flex gap-6 font-medium">
        <li>
          <Link 
            href="/movies" 
            className="cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
          >
            Movies
          </Link>
        </li>
        <li>
          <Link 
            href="/cinema" 
            className="cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
          >
            Cinema
          </Link>
        </li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <Search />
        <DarkMode />
        
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-sm">
          {username ? username[0].toUpperCase() : "?"}
        </div>

        <LogOut />
      </div>
    </nav>
  );
}
