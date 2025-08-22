"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartoonsPage() {
  const [cartoons, setCartoons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCartoons() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/discover/movie?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&with_genres=16&language=en-US&page=1`
        );
        const data = await res.json();
        setCartoons(data.results || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cartoons:", error);
        setLoading(false);
      }
    }
    fetchCartoons();
  }, []);

  if (loading) return <p className="text-center mt-10">⏳ Yuklanmoqda..</p>;
const {id, poster_path, title, release_date } =cartoons 
  return (
    <main className="bg-gray-100 dark:bg-black min-h-screen p-6 transition-colors">
      <h1 className="text-3xl font-bold text-center mb-6">🎬 Multfilmlar</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {cartoons.map((cartoon) => (
          <Link
            key={id}
            href={`/Cartoon/${id}`}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${poster_path}`}
              alt={title}
              className="w-full h-64 object-cover"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold truncate">
                {title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                📅 {release_date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
