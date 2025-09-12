"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Search from "./Search";
import LogOut from "./LogOut";
import UsersPage from "./UserPage";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="font-extrabold text-2xl tracking-wide text-yellow-500">
          As<span className="text-white">Media</span>
        </div>

        <ul className="hidden md:flex gap-8 font-medium text-white">
          <Link href="/Movies" className="relative group">
            <li className="cursor-pointer hover:text-yellow-500 transition-colors">
              Home
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

        <div className="flex items-center gap-4">
          <div className="hidden md:block w-40 lg:w-56 right-10px">
            <Search />
          </div>
          <div>
            <UsersPage />
          </div>
          <Link
            href={"/LIkedPage"}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold text-xs shadow-md"
          >
            ♥
          </Link>

          <LogOut />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

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
            Cinema
          </Link>
        </div>
      )}
    </nav>
  );
}
