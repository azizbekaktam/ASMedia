"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import LogOut from "./LogOut";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUserData(snap.data());
        }
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user) return null;

  const displayName = userData?.name || user.email.split("@")[0] || "No Name";

  return (
    <div className="relative">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-500 shadow-md cursor-pointer hover:scale-105 transition-transform"
      >
        {userData?.photoURL ? (
          <img
            src={userData.photoURL}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold">
            {displayName[0]?.toUpperCase()}
          </div>
        )}
      </div>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-5 z-50 animate-fadeIn space-y-4">

          <div className="flex justify-center">
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt={displayName}
                className="w-20 h-20 rounded-full object-cover border-4 border-yellow-500 shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-2xl font-bold text-black shadow-md">
                {displayName[0]?.toUpperCase()}
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm text-center">
            <h2 className="text-lg font-semibold">{displayName}</h2>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm text-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">{user.email}</p>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm text-center">
            <span
              className={`px-4 py-1 rounded-full text-xs font-medium ${
                userData?.plan === "premium"
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {userData?.plan ? userData.plan.toUpperCase() : "FREE"}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm text-center">
            <span className="px-4 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white">
              {userData?.role ? userData.role.toUpperCase() : "USER"}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm text-center">
            <p className="text-xs text-gray-500">
              {userData?.createdAt
                ? new Date(userData.createdAt).toLocaleString()
                : "Unknown"}
            </p>
          </div>

          <div className="flex justify-center mt-2">
            <LogOut />
          </div>

        </div>
      )}
    </div>
  );
}
