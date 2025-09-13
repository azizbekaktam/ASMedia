"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";
import CartoonSlider from "../components/CartoonSlider";
import Spinder from "../components/Spinder";
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi";
import { FaRegCalendarAlt, FaRegLaughBeam } from "react-icons/fa";

export default function CartoonsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [cartoons, setCartoons] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]); // dynamic genres
  const [selectedCategory, setSelectedCategory] = useState(16); // default: Animation

  // URLdan page va category olish
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentPage = parseInt(params.get("page")) || 1;
    const currentCategory = parseInt(params.get("category")) || 16;
    setPage(currentPage);
    setSelectedCategory(currentCategory);
  }, []);

  // Genres ro‘yxatini olish
  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&language=en-US`
        );
        const data = await res.json();
        // faqat multik, family, comedy, adventure, fantasy ni filter qilamiz
        const filtered = data.genres.filter((g) =>
          [16, 35, 10751, 14, 12].includes(g.id)
        );
        setCategories(filtered);
      } catch (error) {
        console.error("Genres olishda xato:", error);
      }
    }
    fetchGenres();
  }, []);

  // Filmlar olish
  useEffect(() => {
    async function fetchCartoons() {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/discover/movie?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&with_genres=${selectedCategory}&language=en-US&page=${page}`
        );
        const data = await res.json();
        setCartoons(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCartoons();
    router.replace(
      `/Cartoon?page=${page}&category=${selectedCategory}`,
      undefined,
      { scroll: false }
    );
  }, [page, selectedCategory, router]);

  const prevPage = () => setPage((p) => Math.max(p - 1, 1));
  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));

  if (loading) return <Spinder />;

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <Navbar />
      <CartoonSlider />

      <h1 className="text-center text-3xl font-bold mb-6 flex items-center justify-center gap-2">
        <FaRegLaughBeam /> Multfilmlar ({page}/{totalPages})
      </h1>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setPage(1); // category o‘zgarsa 1-sahifadan boshlanadi
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              selectedCategory === cat.id
                ? "bg-yellow-400 text-black shadow-md"
                : "bg-gray-200 hover:bg-yellow-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {cartoons.length > 0 ? (
          cartoons.map((c) => (
            <Link
              key={c.id}
              href={`/Cartoon/${c.id}`}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${c.poster_path}`}
                alt={c.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-2">
                <h2 className="font-semibold truncate">{c.title}</h2>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaRegCalendarAlt /> {c.release_date}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Multfilmlar topilmadi
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          <HiOutlineChevronDoubleLeft />
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          <HiOutlineChevronDoubleRight />
        </button>
      </div>
    </main>
  );
}
