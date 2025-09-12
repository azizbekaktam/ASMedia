"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        router.push("/LoginPage"); // Agar login qilmagan bo‘lsa
        return;
      }

      // Hozirgi foydalanuvchi adminmi?
      const ref = doc(db, "users", currentUser.uid);
      const snap = await getDocs(collection(db, "users"));
      if (!snap.empty) {
        const currentUserData = snap.docs.find(d => d.id === currentUser.uid)?.data();
        setUserData(currentUserData);
        setUser(currentUser);

        if (currentUserData?.role !== "admin") {
          router.push("/"); // oddiy userni chiqarib yuboramiz
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

  const handleRoleChange = async (id, newRole) => {
    await updateDoc(doc(db, "users", id), { role: newRole });
    fetchUsers();
  };

  const handlePlanChange = async (id, newPlan) => {
    await updateDoc(doc(db, "users", id), { plan: newPlan });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel 👑</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Plan</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center">
              <td className="border p-2">{u.name || u.email.split("@")[0]}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="border p-2">
                <select
                  value={u.plan}
                  onChange={(e) => handlePlanChange(u.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
