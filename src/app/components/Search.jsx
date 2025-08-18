"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Spinder from "./Spinder";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleSearch = async (value) => {
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/search/movie`,
        {
          params: {
            api_key: `${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}`,
            query: value,
            language: "en-US",
          },
        }
      );
      setResults(res.data.results.slice(0, 8));
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    handleSearch(value);
  };

  return (
  <div className="relative w-72">
  {/* 🔍 Input */}
  <input
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={handleChange}
    className="border rounded-lg px-3 py-2 w-full 
               bg-gray-100 text-gray-900 placeholder-gray-500 
               focus:outline-none focus:ring-2 focus:ring-yellow-400 
               dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 
               dark:border-gray-700 transition-colors"
  />

  {/* ⏳ Loading */}
  {loading && query && (
    <div className="absolute bg-white dark:bg-gray-800 p-2 w-full shadow rounded-b-lg z-20">
      <Spinder />
    </div>
  )}

  {/* 🔽 Results */}
  {results.length > 0 && query && (
    <ul className="absolute text-gray-900 dark:text-white 
                   bg-white dark:bg-gray-800 
                   shadow rounded-lg mt-1 
                   max-h-60 overflow-auto w-full z-10">
      {results.map((movie) => (
        <li
          key={movie.id}
          className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Link href={`/movie/${movie.id}`} onClick={() => setQuery("")}>
            {movie.title}{" "}
            {movie.release_date ? `(${movie.release_date.split("-")[0]})` : ""}
          </Link>
        </li>
      ))}
    </ul>
  )}
</div>

  );
}

