"use client";

import { useEffect, useState } from "react";
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
  <div className="font-bold text-lg tracking-wide">AsMedia</div>

  <ul className="flex gap-6 font-medium">
    <li className="cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">Home</li>
    <li className="cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">Movies</li>
    <li className="cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">Cinema</li>
  </ul>

  <div className="flex items-center gap-3">
    <Search />
<div>
  <DarkMode/>
</div>
    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-sm">
      {username ? username[0].toUpperCase() : "?"}
    </div>

    <LogOut />
  </div>
</nav>

  );
}
