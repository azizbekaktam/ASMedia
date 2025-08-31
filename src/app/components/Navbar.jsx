"use client";

import { useState } from "react";
import Link from "next/link";
import Search from "./Search";
import LogOut from "./LogOut";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-3 shadow-lg relative flex items-center justify-between">
      
      <div className="font-extrabold text-xl tracking-wide text-yellow-500">
        As<span className="text-gray-900 dark:text-white">Media</span>
      </div>

      <ul className="hidden md:flex gap-6 font-medium items-center">
        <Link href="/" className="group relative">
          <li className="cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
            Home
          </li>
          <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-yellow-500 dark:bg-yellow-400 transition-all"></span>
        </Link>

        <Link href="/Movies" className="group relative">
          <li className="cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
            Movies
          </li>
          <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-yellow-500 dark:bg-yellow-400 transition-all"></span>
        </Link>

        <Link href="/Cartoon" className="group relative">
          <li className="cursor-pointer hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
            Cinema
          </li>
          <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-yellow-500 dark:bg-yellow-400 transition-all"></span>
        </Link>
      </ul>

      <div className="flex items-center gap-4">
        <Search />

        <div className="hidden md:flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold text-sm shadow-md">
            <Link href="/LikedPage">Liked</Link>
          </div>
          <LogOut />
        </div>

        <button
          className="md:hidden text-gray-900 dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`absolute top-0 left-0 w-full h-screen bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center gap-6 transition-transform duration-300 ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/Movies" onClick={() => setMenuOpen(false)}>Movies</Link>
        <Link href="/Cartoon" onClick={() => setMenuOpen(false)}>Cinema</Link>
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold text-sm shadow-md">
          <Link href="/LikedPage" onClick={() => setMenuOpen(false)}>Liked</Link>
        </div>
        <LogOut />
      </div>
    </nav>
  );
}
