"use client";

import { useEffect, useState } from "react";
import Search from "./Search";
import LogOut from "./LogOut";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  return (
<nav
  className="flex items-center justify-between 
             bg-white text-gray-900 
             dark:bg-gray-900 dark:text-white 
             px-6 py-3 shadow-lg transition-colors"
>
  <div className="font-extrabold text-xl tracking-wide text-yellow-500">
    As<span className="text-gray-900 dark:text-white">
        <Image
        src="/asmedia-logo.png"
        alt="AsMedia Logo"
        width={120}
        height={40}
        priority
      />
    </span>
  </div>

  <ul className="flex gap-6 font-medium">
    <Link href="/" className="relative group">
      <li className="cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
        Home
      </li>
      <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-yellow-500 dark:bg-yellow-400 transition-all"></span>
    </Link>

    <Link href="/Movies" className="relative group">
      <li className="cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
        Movies
      </li>
      <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-yellow-500 dark:bg-yellow-400 transition-all"></span>
    </Link>

    <Link href="/Cartoon" className="relative group">
      <li className="cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
        Cinema
      </li>
      <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-yellow-500 dark:bg-yellow-400 transition-all"></span>
    </Link>
  </ul>

  <div className="flex cursor-pointer items-center gap-4">
    <Search />

    <div
      className="w-9 h-9 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 
                 flex items-center justify-center 
                 text-black font-bold text-sm shadow-md"
    >
      {username ? username[0].toUpperCase() : "?"}
    </div>
<div className="cursor-pointer">
    <LogOut />

</div>
  </div>
</nav>

  );
}
