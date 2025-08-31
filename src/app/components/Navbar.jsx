"use client";

import { useState } from "react";
import Search from "./Search";
import LogOut from "./LogOut";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { FaRegGrinHearts } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-gray-900 dark:bg-gray-900 dark:text-white shadow-lg transition-colors">
      <div className="flex items-center justify-between px-6 py-3">
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

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search input doim tursin */}
          <div className="w-52">
            <Search />
          </div>

          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 
                 flex items-center justify-center text-black font-bold text-sm shadow-md">
            <Link href={"/LikedPage"}>♥</Link>
          </div>

          <LogOut />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-yellow-500 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-6 py-4 space-y-4 shadow-lg">
          <div className="w-full">
            <Search className="w-full max-w-xs" />
          </div>

          <Link href="/" className="block hover:text-yellow-500">Home</Link>
          <Link href="/Movies" className="block hover:text-yellow-500">Movies</Link>
          <Link href="/Cartoon" className="block hover:text-yellow-500">Cinema</Link>

          <div className="flex items-center gap-4 pt-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 
                   flex items-center justify-center text-black font-bold text-sm shadow-md">
              <Link href={"/LikedPage"}><FaRegGrinHearts/></Link>
            </div>
            <LogOut />
          </div>
        </div>
      )}
    </nav>
  );
}
