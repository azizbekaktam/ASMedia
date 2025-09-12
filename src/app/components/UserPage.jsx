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
    return null; // login qilmagan bo'lsa hech narsa chiqmaydi
  }

  return (
    <>
      {/* Avatar headerda */}
      <div
        onClick={() => setOpen(true)}
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
            {userData?.name ? userData.name[0] : "?"}
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 px-4">
          <div className="relative bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>

            <div className="flex flex-col items-center text-center">
              {/* Avatar big */}
              {userData?.photoURL ? (
                <img
                  src={userData.photoURL}
                  alt={userData?.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-yellow-500 shadow-md mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-3xl font-bold text-black shadow-md mb-4">
                  {userData?.name ? userData.name[0] : "?"}
                </div>
              )}

              {/* User details */}
              <h2 className="text-2xl font-bold">
                {userData?.name || "No Name"}
              </h2>
              <p className="text-gray-500">{user.email}</p>

              {/* Plan */}
              <span
                className={`mt-5 px-6 py-2 rounded-full text-sm font-semibold ${
                  userData?.plan === "premium"
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {userData?.plan ? userData.plan.toUpperCase() : "FREE"}
              </span>

              {/* 🔜 Keyin Logout tugma shu yerga qo'shamiz */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
