
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function MovieList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const blockedIds = [1280461, 715287, 611251, 259872, 1211373,993234, 1040159, 460229, 1476292, 829557, 82023, 226674, 1234720, 968171, 1357459, 592695, 19173, 537915, 707610, 173705, 694943, 173185, 1414272, 994682,337167, 22705,2105, 1145645, 387824, 1264854, 1135869, 231164, 269955, 1055110, 
                    233651, 800409, 469877, 79871, 1337395, 437542, 587727, 939099, 744275, 105825, 913259, 286687, 297090, 43947, 481871, 55580, 1173558, 936621, 440617, 249397, 50270, 377,351523, 345, 464026, 18190, 339846, 123338, 276126, 85430, 1302004, 974573,
                    484133, 8275, 27098, 1135850, 86331, 1337411, 689160, 1018, 48650, 11013, 390845, 115290, 10591, 302945,423502, 253350, 

];
 
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/movie/popular?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&language=en-US&page=${pageFromUrl}`
      )
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
      })
      .catch((err) => console.error(err));
  }, [pageFromUrl]);

  const changePage = (newPage) => {
    router.push(`/Movies?page=${newPage}`);
  };

  return (
<div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors">
  {/* 🎬 Movies Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-6">
    {movies
      .filter((movie) => !blockedIds.includes(movie.id)) // 🚫 Bloklanganlarni chiqarma
      .map((movie) => (
        <Link href={`/movie/${movie.id}`} key={movie.id}>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform">
            <img
              src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-bold truncate text-gray-900 dark:text-white">
                {movie.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {movie.release_date}
              </p>
            </div>
          </div>
        </Link>
      ))}
  </div>

  {/* 📄 Pagination */}
  <div className="flex justify-center items-center gap-4">
    <button
      onClick={() => changePage(Math.max(pageFromUrl - 1, 1))}
      disabled={pageFromUrl === 1}
      className="px-4 py-2 rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
    >
      Prev
    </button>

    <span className="text-gray-900 dark:text-gray-200 font-medium">
      Page {pageFromUrl} / {totalPages}
    </span>

    <button
      onClick={() => changePage(Math.min(pageFromUrl + 1, totalPages))}
      disabled={pageFromUrl === totalPages}
      className="px-4 py-2 rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
    >
      Next
    </button>
  </div>
</div>

  );
}
