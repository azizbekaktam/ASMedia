"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import CartoonSlider from "../components/CartoonSlider";
import Spinder from "../components/Spinder";


export default function CartoonsPage() {
  const { page } = useParams(); // URL dan page olamiz
  const router = useRouter();
  const currentPage = Number(page) || 1;

  const [cartoons, setCartoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchCartoons() {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/discover/movie?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&with_genres=16&language=en-US&page=${currentPage}`
        );
        const data = await res.json();
        setCartoons(data.results || []);
        setTotalPages(data.total_pages || 1);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cartoons:", error);
        setLoading(false);
      }
    }
    fetchCartoons();
  }, [currentPage]);

  if (loading) return <p className="text-center mt-10"><Spinder/></p>;

  return (
    <main className="p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors">
      <Navbar />
      <CartoonSlider />

      <h1 className="text-3xl font-bold text-center mb-10">
        🎬 Multfilmlar ({currentPage}/{totalPages})
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {cartoons.map((cartoon) => (
          <Link key={cartoon.id} href={`/Cartoon/${cartoon.id}`}>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg">
              <img
                src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${cartoon.poster_path}`}
                alt={cartoon.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-3">
                <h2 className="text-lg font-semibold truncate">{cartoon.title}</h2>
                <p className="text-sm text-gray-500">📅 {cartoon.release_date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-6 mt-12">
        <button
          onClick={() => router.push(`/Cartoons/${Math.max(currentPage - 1, 1)}`)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-40"
        >
          ◀ Oldingi
        </button>
        <span>
          Sahifa {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => router.push(`/Cartoons/${Math.min(currentPage + 1, totalPages)}`)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-40"
        >
          Keyingi ▶
        </button>
      </div>
    </main>
  );
}
