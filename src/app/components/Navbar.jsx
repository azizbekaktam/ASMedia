"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Search from "./Search";
import LogOut from "./LogOut";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="font-extrabold text-2xl tracking-wide text-yellow-500">
          As<span className="text-white">Media</span>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-8 font-medium text-white items-center">
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
              Cartoon
            </li>
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-yellow-500 transition-all"></span>
          </Link>

          <Link href="/LIkedPage" className="relative group">
            <li className="cursor-pointer hover:text-yellow-500 transition-colors">
              Like
            </li>
            <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-yellow-500 transition-all"></span>
          </Link>
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search bar */}
          <div className="hidden md:block w-40 lg:w-56">
            <Search />
          </div>

          {/* Like button */}
          <Link
            href={"/LIkedPage"}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold text-xs shadow-md hover:scale-110 transition-transform"
          >
            ♥
          </Link>

          {/* Avatar */}
          <Link href="/UserPage">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-500 shadow-md cursor-pointer hover:scale-105 transition-transform">
              <img
                src="https://i.pravatar.cc/100" // test avatar rasmi
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Logout */}
          <LogOut />

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 shadow-md px-6 py-4 space-y-4 text-white">
          <div className="w-full">
            <Search />
          </div>
          <Link href="/" className="block hover:text-yellow-500">
            Home
          </Link>
          <Link href="/Movies" className="block hover:text-yellow-500">
            Movies
          </Link>
          <Link href="/Cartoon" className="block hover:text-yellow-500">
            Cartoon
          </Link>
          <Link href="/LIkedPage" className="block hover:text-yellow-500">
            Like
          </Link>
        </div>
      )}
    </nav>
  );
}
