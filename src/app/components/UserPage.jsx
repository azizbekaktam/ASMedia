"use client";

import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Modal uchun user

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900 dark:text-white">
        👥 All Users
      </h1>

      {/* Users grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)} // bosilganda modal ochiladi
            className="cursor-pointer bg-white dark:bg-gray-800 shadow-md rounded-2xl p-5 hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-yellow-500 shadow-sm"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-lg font-bold text-black shadow-sm">
                  {user.name ? user.name[0] : "?"}
                </div>
              )}

              {/* User info */}
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">
                  {user.name || "No Name"}
                </h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>

            {/* Plan badge */}
            <p
              className={`mt-3 inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                user.plan === "premium"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {user.plan ? user.plan.toUpperCase() : "FREE"}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>

            <div className="flex flex-col items-center text-center">
              {/* Avatar big */}
              {selectedUser.photoURL ? (
                <img
                  src={selectedUser.photoURL}
                  alt={selectedUser.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-yellow-500 shadow-md mb-4"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-3xl font-bold text-black shadow-md mb-4">
                  {selectedUser.name ? selectedUser.name[0] : "?"}
                </div>
              )}

              {/* User details */}
              <h2 className="text-2xl font-bold">{selectedUser.name || "No Name"}</h2>
              <p className="text-gray-500">{selectedUser.email}</p>

              <p
                className={`mt-5 px-6 py-2 rounded-full text-sm font-semibold ${
                  selectedUser.plan === "premium"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {selectedUser.plan ? selectedUser.plan.toUpperCase() : "FREE"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
