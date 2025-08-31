"use client";

import { useState } from "react";
import Link from "next/link";
import Search from "./Search";
import LogOut from "./LogOut";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-3 shadow-lg flex items-center justify-between">
      <div className="font-extrabold text-2xl tracking-wide text-yellow-500">
        Asi<span className="text-gray-900 dark:text-white">lMedia</span>
      </div>

      <ul className="hidden md:flex gap-8 font-medium items-center">
        <Link href="/" className="hover:text-yellow-500 transition-colors">
          Home
        </Link>
        <Link
          href="/Movies"
          className="hover:text-yellow-500 transition-colors"
        >
          Movies
        </Link>
        <Link
          href="/Cartoon"
          className="hover:text-yellow-500 transition-colors"
        >
          Cartoons
        </Link>
      </ul>

      <div className="flex items-center gap-4">
        <div className="w-28 sm:w-40 md:w-64">
          <Search />
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-sm shadow-md">
            <Link href="/LikedPage">Liked</Link>
          </div>
          <LogOut />
        </div>

        <button
          className="md:hidden text-gray-900 dark:text-white"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars className="w-6 h-6" />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div
            className={`absolute top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
              <span className="font-bold text-lg text-yellow-500">Menu</span>
              <button onClick={() => setMenuOpen(false)}>
                <FaTimes className="w-6 h-6 text-gray-700 dark:text-white" />
              </button>
            </div>

            <ul className="flex flex-col gap-6 px-6 py-6 font-medium">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link href="/Movies" onClick={() => setMenuOpen(false)}>
                Movies
              </Link>
              <Link href="/Cartoon" onClick={() => setMenuOpen(false)}>
                Cartoons
              </Link>

              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold text-sm shadow-md">
                <Link href="/LikedPage" onClick={() => setMenuOpen(false)}>
                  Liked
                </Link>
              </div>
              <LogOut />
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
