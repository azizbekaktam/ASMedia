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
      
      {/* Logo */}
      <div className="font-extrabold text-xl tracking-wide text-yellow-500">
        As<span className="text-gray-900 dark:text-white">Media</span>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 font-medium">
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

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <Search />
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold text-sm shadow-md">
          <Link href="/LikedPage">Liked</Link>
        </div>
        <LogOut />
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-gray-900 dark:text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white dark:bg-gray-900 md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-screen p-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 text-center">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/Movies" onClick={() => setMenuOpen(false)}>Movies</Link>
          <Link href="/Cartoon" onClick={() => setMenuOpen(false)}>Cinema</Link>
          <Search />
          <div className="w-9 h-9 mx-auto rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold text-sm shadow-md">
            <Link href="/LikedPage" onClick={() => setMenuOpen(false)}>Liked</Link>
          </div>
          <LogOut />
        </ul>
      </div>
    </nav>
  );
}
