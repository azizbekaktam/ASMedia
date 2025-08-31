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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const current = parseInt(params.get("page")) || 1;
    setPage(current);
  }, []);

  useEffect(() => {
    async function fetchCartoons() {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/discover/movie?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&with_genres=16&language=en-US&page=${page}`
        );
        const data = await res.json();
        setCartoons(data.results);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCartoons();
    router.replace(`/Cartoon?page=${page}`, undefined, { scroll: false });
  }, [page, router]);

  const prevPage = () => setPage((p) => Math.max(p - 1, 1));
  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));

  if (loading) return <Spinder />;

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <Navbar />
      <CartoonSlider />

      <h1 className="text-center text-3xl font-bold mb-10">
        <FaRegLaughBeam /> Multfilmlar ({page}/{totalPages})
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {cartoons.map((c) => (
          <Link key={c.id} href={`/Cartoon/${c.id}`} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
            <img
              src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${c.poster_path}`}
              alt={c.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-2">
              <h2 className="font-semibold truncate">{c.title}</h2>
              <p className="text-sm text-gray-500"><FaRegCalendarAlt/> {c.release_date}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button onClick={prevPage} disabled={page === 1} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
<HiOutlineChevronDoubleLeft />
        </button>
        <span>{page} / {totalPages}</span>
        <button onClick={nextPage} disabled={page === totalPages} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
<HiOutlineChevronDoubleRight />
        </button>
      </div>
    </main>
  );
}
