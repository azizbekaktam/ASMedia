"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Spinder from "../components/Spinder";

export default function Movies() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const blockedIds = [1280461, 715287, 611251, 259872, 1211373];

  useEffect(() => {
    async function run() {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        router.replace("/");
        return;
      }

      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/movie/popular`,
          {
            params: {
              api_key: process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key,
              language: "en-US",
              page,
            },
          }
        );
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);

        // 🔑 URL query yangilash (faqat page o‘zgarsa)
        router.replace(`/Movies?page=${page}`);
      } catch (e) {
        console.error("API error:", e);
      } finally {
        setLoading(false);
      }
    }

    run();
  }, [page, router]);

  if (loading) return <Spinder />;

  const prevPage = () => setPage((p) => Math.max(p - 1, 1));
  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors">
      <Navbar />
      <Slider />

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 mb-8">
        {movies
          .filter((m) => !blockedIds.includes(m.id))
          .map((movie) => (
            <Link href={`/Movies/${movie.id}`} key={movie.id}>
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300">
                <img
                  src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-bold truncate text-gray-900 dark:text-white">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    📅 {movie.release_date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>

      <div className="flex justify-center items-center gap-6">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          ◀ Prev
        </button>

        <span className="text-gray-900 dark:text-gray-200 font-medium">
          Page {page} / {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
