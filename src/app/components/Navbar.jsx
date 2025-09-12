"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bell } from "lucide-react";
import Search from "./Search";
import LogOut from "./LogOut";
import UserProfile from "./UserPage";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUserRole(snap.data().role);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/Movies" },
    { name: "Cartoon", href: "/Cartoon" },
    { name: "Like", href: "/LIkedPage" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="font-extrabold text-2xl tracking-wide text-yellow-500">
          As<span className="text-white">Media</span>
        </div>

        <ul className="hidden md:flex gap-6 font-medium text-white items-center">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="relative group">
              <li
                className={`cursor-pointer transition-colors ${
                  pathname === item.href ? "text-yellow-400 font-bold" : "hover:text-yellow-500"
                }`}
              >
                {item.name}
              </li>
              <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-yellow-500 transition-all"></span>
            </Link>
          ))}

          {userRole === "admin" && (
            <Link href="/Admin" className="relative group">
              <li
                className={`cursor-pointer transition-colors ${
                  pathname === "/Admin" ? "text-yellow-400 font-bold" : "hover:text-yellow-500"
                }`}
              >
                Admin
              </li>
              <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-0.5 bg-yellow-500 transition-all"></span>
            </Link>
          )}

          <li className="relative">
            <Bell className="w-5 h-5 cursor-pointer hover:text-yellow-500 transition-colors" />
            <span className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </li>

          <div className="w-10 h-10 rounded-full border-2 border-yellow-500 relative">
            <UserProfile />
          </div>
        </ul>

        <div className="flex items-center gap-4">
          <div className="hidden md:block w-40 lg:w-56">
            <Search />
          </div>

          <Link
            href={"/LIkedPage"}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold text-xs shadow-md hover:scale-110 transition-transform"
          >
            ♥
          </Link>

          {/* <LogOut /> */}

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-900 shadow-md px-6 py-4 space-y-4 text-white">
          <Search />
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="block hover:text-yellow-500">
              {item.name}
            </Link>
          ))}
          {userRole === "admin" && (
            <Link href="/Admin" className="block hover:text-yellow-500">
              Admin
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
