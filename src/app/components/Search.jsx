"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

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
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
        className="border rounded p-2 w-full text-white"
      />

      {loading && query && (
        <div className="absolute bg-white p-2 w-full shadow">Loading...</div>
      )}

      {results.length > 0 && query && (
        <ul className="absolute text-black bg-white shadow rounded mt-1 max-h-60 overflow-auto w-full z-10">
          {results.map((movie) => (
            <li key={movie.id} className="p-2 hover:bg-gray-200">
              <Link href={`/movie/${movie.id}`} onClick={() => setQuery("")}>
                {movie.title}{" "}
                {movie.release_date
                  ? `(${movie.release_date.split("-")[0]})`
                  : ""}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

