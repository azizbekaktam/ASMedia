"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import CartoonSlider from "../components/CartoonSlider";

export default function CartoonsPage() {
  const [page, setPage] = useState(1); // faqat state orqali boshqaramiz
  const [cartoons, setCartoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchCartoons() {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/discover/movie?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&with_genres=16&language=en-US&page=${page}`
        );
        const data = await res.json();
        setCartoons(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Error fetching cartoons:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCartoons();
  }, [page]);

  const prevPage = () => setPage((p) => Math.max(p - 1, 1));
  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));

  if (loading) return <p className="text-center mt-10">⏳ Yuklanmoqda..</p>;

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black min-h-screen p-6">
      <Navbar />
      <CartoonSlider />

      <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-900 dark:text-white">
        🎬 Multfilmlar{" "}
        <span className="text-blue-600">
          ({page}/{totalPages})
        </span>
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {cartoons.map((cartoon) => (
          <Link
            key={cartoon.id}
            href={`/Cartoon/${cartoon.id}`}
            className="group bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden 
                       hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
          >
            <div className="relative">
              <img
                src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${cartoon.poster_path}`}
                alt={cartoon.title}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 right-3 bg-yellow-500 text-white text-sm font-bold px-2 py-1 rounded-lg shadow">
                ⭐ {cartoon.vote_average?.toFixed(1) || "N/A"}
              </span>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-600 transition">
                {cartoon.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                📅 {cartoon.release_date}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 mt-12">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className={`px-5 py-2 rounded-xl font-medium ${
            page === 1
              ? "opacity-40 cursor-not-allowed bg-gray-300"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          ◀ Oldingi
        </button>

        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Sahifa {page} / {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className={`px-5 py-2 rounded-xl font-medium ${
            page === totalPages
              ? "opacity-40 cursor-not-allowed bg-gray-300"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Keyingi ▶
        </button>
      </div>
    </main>
  );
}
