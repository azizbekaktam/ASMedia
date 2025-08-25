"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Spinder from "../components/Spinder";

export default function Movies() {
  const { page } = useParams();
  const router = useRouter();

  const pageFromUrl = Number(page) || 1;
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const blockedIds = [1280461, 715287, 611251, 259872, 1211373];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
      return;
    }

    axios
      .get(
        `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/movie/popular?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&language=en-US&page=${pageFromUrl}`
      )
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [pageFromUrl, router]);

  if (loading) {
    return <Spinder />;
  }

  const changePage = (newPage) => {
    router.push(`/Movies?page=${newPage}`);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors">
      <Navbar />
      <Slider />

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 mb-8">
        {movies
          .filter((movie) => !blockedIds.includes(movie.id))
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
          onClick={() => changePage(Math.max(pageFromUrl - 1, 1))}
          disabled={pageFromUrl === 1}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white 
                     hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          ◀ Prev
        </button>

        <span className="text-gray-900 dark:text-gray-200 font-medium">
          Page {pageFromUrl} / {totalPages}
        </span>

        <button
          onClick={() => changePage(Math.min(pageFromUrl + 1, totalPages))}
          disabled={pageFromUrl === totalPages}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white 
                     hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
