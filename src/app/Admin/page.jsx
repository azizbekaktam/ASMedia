"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState("");
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
    setTimeout(() => setToast(""), 2500);
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

  // Filter & Search
  const filteredUsers = users
    .filter((u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.name && u.name.toLowerCase().includes(search.toLowerCase()))
    )
    .filter((u) => {
      if (filter === "all") return true;
      if (filter === "admin") return u.role === "admin";
      if (filter === "user") return u.role === "user";
      if (filter === "premium") return u.plan === "premium";
      if (filter === "free") return u.plan === "free";
      return true;
    });

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Panel 👑</h1>

      {toast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fadeIn">
          {toast}
        </div>
      )}

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Foydalanuvchi qidirish (ism/email)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === "all" ? "bg-yellow-400 text-black" : "bg-gray-200"}`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setFilter("admin")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === "admin" ? "bg-yellow-400 text-black" : "bg-gray-200"}`}
          >
            Adminlar
          </button>
          <button
            onClick={() => setFilter("user")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === "user" ? "bg-yellow-400 text-black" : "bg-gray-200"}`}
          >
            Userlar
          </button>
          <button
            onClick={() => setFilter("premium")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === "premium" ? "bg-yellow-400 text-black" : "bg-gray-200"}`}
          >
            Premium
          </button>
          <button
            onClick={() => setFilter("free")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === "free" ? "bg-yellow-400 text-black" : "bg-gray-200"}`}
          >
            Free
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-yellow-400 text-black text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Plan</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u, i) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{u.name || u.email.split("@")[0]}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="p-1 rounded border border-gray-300"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <select
                      value={u.plan}
                      onChange={(e) => handlePlanChange(u.id, e.target.value)}
                      className="p-1 rounded border border-gray-300"
                    >
                      <option value="free">Free</option>
                      <option value="premium">Premium</option>
                    </select>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  Hech qanday foydalanuvchi topilmadi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
