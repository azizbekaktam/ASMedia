"use client";

import { useState } from "react";
import Search from "./Search";
import LogOut from "./LogOut";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-3 shadow-lg transition-colors relative">
      
      {/* Logo */}
      <div className="font-extrabold text-xl tracking-wide text-yellow-500">
        As<span className="text-gray-900 dark:text-white">Media</span>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 font-medium">
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

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <Search />
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold text-sm shadow-md">
          <Link href={"/LikedPage"}>Liked</Link>
        </div>
        <LogOut />
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setOpen(!open)}>
          {open ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 flex flex-col items-center gap-4 p-4 shadow-md md:hidden">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/Movies" onClick={() => setOpen(false)}>Movies</Link>
          <Link href="/Cartoon" onClick={() => setOpen(false)}>Cinema</Link>
          <Search />
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold text-sm shadow-md">
            <Link href={"/LikedPage"} onClick={() => setOpen(false)}>Liked</Link>
          </div>
          <LogOut />
        </div>
      )}
    </nav>
  );
}
