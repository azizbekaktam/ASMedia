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
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)} // bosilganda modal ochiladi
            className="cursor-pointer bg-white shadow-md rounded-xl p-4 hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-lg font-bold">
                {user.name ? user.name[0] : "?"}
              </div>
              <div>
                <h2 className="font-bold">{user.name || "No Name"}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>
            <p
              className={`mt-2 text-sm font-semibold ${
                user.plan === "premium" ? "text-green-600" : "text-gray-600"
              }`}
            >
              {user.plan ? user.plan.toUpperCase() : "FREE"}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-2xl shadow-lg w-96 relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-2xl font-bold mb-3">
                {selectedUser.name ? selectedUser.name[0] : "?"}
              </div>
              <h2 className="text-xl font-bold">{selectedUser.name || "No Name"}</h2>
              <p className="text-gray-500">{selectedUser.email}</p>
              <p
                className={`mt-4 px-4 py-1 rounded-full text-sm font-semibold ${
                  selectedUser.plan === "premium"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
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
