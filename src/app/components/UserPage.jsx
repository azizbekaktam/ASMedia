"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

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

  if (!user) {
    return null; // login qilmagan bo'lsa chiqmaydi
  }

  // Fallback name agar bazada yo'q bo'lsa
  const displayName =
    userData?.name || user.email.split("@")[0] || "No Name";

  return (
    <div className="relative">
      {/* Avatar */}
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

      {/* Dropdown modal (avatar tagidan chiqadi) */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50 animate-fadeIn">
          <div className="flex flex-col items-center text-center">
            {/* Avatar big */}
            {userData?.photoURL ? (
              <img
                src={userData.photoURL}
                alt={displayName}
                className="w-16 h-16 rounded-full object-cover border-2 border-yellow-500 shadow mb-3"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-xl font-bold text-black shadow mb-3">
                {displayName[0]?.toUpperCase()}
              </div>
            )}

            {/* User details */}
            <h2 className="text-lg font-semibold">{displayName}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>

            {/* Plan */}
            <span
              className={`mt-3 px-4 py-1 rounded-full text-xs font-medium ${
                userData?.plan === "premium"
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {userData?.plan ? userData.plan.toUpperCase() : "FREE"}
            </span>

            {/* 🔜 Keyin logout tugma qo'shamiz */}
          </div>
        </div>
      )}
    </div>
  );
}
