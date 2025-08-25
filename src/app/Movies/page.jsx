"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MoviesPage({ searchParams }) {
  const router = useRouter();
  const pageFromUrl = Number(searchParams.page) || 1;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Link}/movie/popular?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Key}&page=${pageFromUrl}`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    }

    fetchMovies();
  }, [pageFromUrl]);

  const handleNextPage = () => {
    router.push(`/Movies?page=${pageFromUrl + 1}`);
    router.refresh(); // 🔑 sahifani yangilaydi
  };

  const handlePrevPage = () => {
    if (pageFromUrl > 1) {
      router.push(`/Movies?page=${pageFromUrl - 1}`);
      router.refresh(); // 🔑 sahifani yangilaydi
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Movies (Page {pageFromUrl})</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 text-white p-2 rounded">
            <img
              src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded"
            />
            <h2 className="mt-2 text-sm">{movie.title}</h2>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevPage}
          disabled={pageFromUrl === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
