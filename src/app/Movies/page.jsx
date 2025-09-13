"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Spinder from "../components/Spinder";
import Slider from "../components/Slider";
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from "react-icons/hi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdMovie } from "react-icons/md";

export default function MoviesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]); // genres
  const [selectedCategory, setSelectedCategory] = useState(null); // default: null = barcha

  // Filtr qilinadigan IDlar
  const blockedIds = [
    1280461, 715287, 611251, 259872, 1211373, 1506456, 1365103, 993236, 1127648,
    226674, 1470086, 641284, 147714, 460229, 1476292, 1140142, 1529510, 82023,
    86767, 1212337, 1234720, 1252309, 1501238, 1357459, 1241752,
  ];

  // URL parametrlardan page va category olish
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentPage = parseInt(params.get("page")) || 1;
    const currentCategory = params.get("category") ? parseInt(params.get("category")) : null;
    setPage(currentPage);
    setSelectedCategory(currentCategory);
  }, []);

  // Genres ro‘yxatini olish
  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&language=en-US`
        );
        const data = await res.json();
        setCategories(data.genres || []);
      } catch (error) {
        console.error("Genres olishda xato:", error);
      }
    }
    fetchGenres();
  }, []);

  // Filmlar olish
  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const url = `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/discover/movie?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&language=en-US&page=${page}${
          selectedCategory ? `&with_genres=${selectedCategory}` : ""
        }`;

        const res = await fetch(url);
        const data = await res.json();

        const filtered = (data.results || []).filter(
          (m) => !blockedIds.includes(m.id)
        );

        setMovies(filtered);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();

    router.replace(
      `/Movies?page=${page}${selectedCategory ? `&category=${selectedCategory}` : ""}`,
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
      <Slider />

      <h1 className="text-center text-3xl font-bold mb-6 flex items-center justify-center gap-2">
        <MdMovie /> Kinolar ({page}/{totalPages})
      </h1>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <button
          onClick={() => {
            setSelectedCategory(null);
            setPage(1);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedCategory === null
              ? "bg-yellow-400 text-black shadow-md"
              : "bg-gray-200 hover:bg-yellow-200"
          }`}
        >
          Barchasi
        </button>

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
        {movies.length > 0 ? (
          movies.map((m) => (
            <Link
              key={m.id}
              href={`/Movies/${m.id}`}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${m.poster_path}`}
                alt={m.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-2">
                <h2 className="font-semibold truncate">{m.title}</h2>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaRegCalendarAlt /> {m.release_date}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Kinolar topilmadi
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
