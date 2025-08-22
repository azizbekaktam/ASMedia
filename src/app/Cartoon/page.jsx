"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import CartoonSlider from "../components/CartoonSlider";

export default function CartoonsPage() {
  const [cartoons, setCartoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // 🌟 Hozirgi sahifa
  const [totalPages, setTotalPages] = useState(1); // 🌟 Umumiy sahifalar

  useEffect(() => {
    async function fetchCartoons() {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/discover/movie?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&with_genres=16&language=en-US&page=${page}`
        );
        const data = await res.json();
        setCartoons(data.results || []);
        setTotalPages(data.total_pages || 1); // 🌟 umumiy sahifalar soni
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cartoons:", error);
        setLoading(false);
      }
    }
    fetchCartoons();
  }, [page]); // sahifa o‘zgarganda qaytadan fetch

  if (loading) return <p className="text-center mt-10">⏳ Yuklanmoqda..</p>;

  return (
    <main className="bg-gray-100 dark:bg-black min-h-screen p-6 transition-colors">
      <Navbar />
      <CartoonSlider />

      {/* 🌟 Sahifa soni tepada */}
      <h1 className="text-2xl font-bold text-center mb-6">
        🎬 Multfilmlar (Sahifa {page}/{totalPages})
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {cartoons.map((cartoon) => (
          <Link
            key={cartoon.id}
            href={`/Cartoon/${cartoon.id}`}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${cartoon.poster_path}`}
              alt={cartoon.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold truncate">
                {cartoon.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                📅 {cartoon.release_date}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* 🌟 Pagination tugmalari */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg disabled:opacity-50"
        >
          ◀ Oldingi
        </button>
        <span className="text-lg font-medium">
          Sahifa {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg disabled:opacity-50"
        >
          Keyingi ▶
        </button>
      </div>
    </main>
  );
}
