"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search as SearchIcon } from "lucide-react";
import Search from "./Search";
import LogOut from "./LogOut";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="font-extrabold text-xl tracking-wide text-yellow-500">
          As<span className="text-gray-900 dark:text-white">Media</span>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 font-medium">
          <Link href="/" className="relative group">
            <li className="cursor-pointer hover:text-yellow-500 transition-colors">
              Home
            </li>
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-yellow-500 transition-all"></span>
          </Link>

          <Link href="/Movies" className="relative group">
            <li className="cursor-pointer hover:text-yellow-500 transition-colors">
              Movies
            </li>
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-yellow-500 transition-all"></span>
          </Link>

          <Link href="/Cartoon" className="relative group">
            <li className="cursor-pointer hover:text-yellow-500 transition-colors">
              Cinema
            </li>
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-yellow-500 transition-all"></span>
          </Link>
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search (desktop) */}
          <div className="hidden md:block w-48">
            <Search />
          </div>

          {/* Liked button */}
          <Link
            href={"/LIkedPage"}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold text-xs shadow-md"
          >
            ♥
          </Link>

          {/* Logout */}
          <LogOut />

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 dark:text-white"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md px-6 py-4 space-y-4">
          <Search /> {/* Mobil search qisqa bo‘lishi uchun width 100% emas */}
          <Link href="/" className="block hover:text-yellow-500">Home</Link>
          <Link href="/Movies" className="block hover:text-yellow-500">Movies</Link>
          <Link href="/Cartoon" className="block hover:text-yellow-500">Cinema</Link>
        </div>
      )}
    </nav>
  );
}
