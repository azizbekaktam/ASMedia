// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";
// import { useSearchParams, useRouter } from "next/navigation";
// import Navbar from "../components/Navbar";
// import Slider from "../components/Slider";
// import Spinder from "../components/Spinder";

// export default function Movies() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const pageFromUrl = Number(searchParams.get("page")) || 1;

//   const [movies, setMovies] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/");
//     }
//     setLoading(false);
//   }, [router]);

//   if (loading) {
//     return <Spinder />;
//   }

//   const blockedIds = [1280461, 715287, 611251, 259872, 1211373];

//   useEffect(() => {
//     axios
//       .get(
//         `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/movie/popular?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&language=en-US&page=${pageFromUrl}`
//       )
//       .then((res) => {
//         setMovies(res.data.results);
//         setTotalPages(res.data.total_pages);
//       })
//       .catch((err) => console.error(err));
//   }, [pageFromUrl]);

//   const changePage = (newPage) => {
//     router.push(`/Movies?page=${newPage}`);
//   };

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors">
//       <Navbar />
//       <Slider />

//       <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 mb-8">
//         {movies
//           .filter((movie) => !blockedIds.includes(movie.id))
//           .map((movie) => (
//             <Link href={`/Movies/${movie.id}`} key={movie.id}>
//               <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300">
//                 <img
//                   src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}${movie.poster_path}`}
//                   alt={movie.title}
//                   className="w-full h-72 object-cover"
//                 />
//                 <div className="p-3">
//                   <h3 className="text-sm font-bold truncate text-gray-900 dark:text-white">
//                     {movie.title}
//                   </h3>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     📅 {movie.release_date}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//       </div>

//       <div className="flex justify-center items-center gap-6">
//         <button
//           onClick={() => changePage(Math.max(pageFromUrl - 1, 1))}
//           disabled={pageFromUrl === 1}
//           className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white 
//                      hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
//         >
//           ◀ Prev
//         </button>

//         <span className="text-gray-900 dark:text-gray-200 font-medium">
//           Page {pageFromUrl} / {totalPages}
//         </span>

//         <button
//           onClick={() => changePage(Math.min(pageFromUrl + 1, totalPages))}
//           disabled={pageFromUrl === totalPages}
//           className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white 
//                      hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
//         >
//           Next ▶
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";

export default function MoviesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
     const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
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
  }, [pageFromUrl, router]); // faqat page o'zgarganda chaqiriladi

  const handleNextPage = () => {
    router.push(`/Movies?page=${pageFromUrl + 1}`);
  };

  const handlePrevPage = () => {
    if (pageFromUrl > 1) {
      router.push(`/Movies?page=${pageFromUrl - 1}`);
    }
  };

  return (
    <div className="p-4">
      <Navbar/>
      <Slider/>
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
