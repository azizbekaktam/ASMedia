"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const [toast, setToast] = useState(""); // Toast xabar
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        router.push("/LoginPage");
        return;
      }

      const snap = await getDocs(collection(db, "users"));
      if (!snap.empty) {
        const currentUserData = snap.docs.find(d => d.id === currentUser.uid)?.data();
        setUserData(currentUserData);
        setUser(currentUser);

        if (currentUserData?.role !== "admin") {
          router.push("/");
        } else {
          fetchUsers();
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    setUsers(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500); // 2.5 soniya ko‘rsatadi
  };

  const handleRoleChange = async (id, newRole) => {
    await updateDoc(doc(db, "users", id), { role: newRole });
    fetchUsers();
    showToast("Role o‘zgartirildi ✅");
  };

  const handlePlanChange = async (id, newPlan) => {
    await updateDoc(doc(db, "users", id), { plan: newPlan });
    fetchUsers();
    showToast("Plan o‘zgartirildi ✅");
  };

  const handleDelete = async (id) => {
    if (confirm("Ushbu foydalanuvchini o‘chirmoqchimisiz?")) {
      await deleteDoc(doc(db, "users", id));
      fetchUsers();
      showToast("Foydalanuvchi o‘chirildi ❌");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen relative">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Admin Panel 👑</h1>

      {toast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fadeIn">
          {toast}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((u) => (
          <div key={u.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-5 flex flex-col items-center transition hover:scale-105">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-500 shadow-md mb-4 flex items-center justify-center text-2xl font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-500">
              {u.name ? u.name[0].toUpperCase() : u.email[0].toUpperCase()}
            </div>

            <h2 className="text-lg font-semibold mb-1">{u.name || u.email.split("@")[0]}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">{u.email}</p>

            <div className="mb-2 w-full text-center">
              <select
                value={u.role}
                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                className="w-full p-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="mb-4 w-full text-center">
              <select
                value={u.plan}
                onChange={(e) => handlePlanChange(u.id, e.target.value)}
                className="w-full p-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                <option value="free">Free</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <button
              onClick={() => handleDelete(u.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md w-full transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
