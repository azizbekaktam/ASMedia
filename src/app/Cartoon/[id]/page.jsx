"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BackButton from "@/components/BackButton";

export default function CartoonDetail() {
  const { id } = useParams();
  const [cartoon, setCartoon] = useState([]);
  const [trailerKey, setTrailerKey] = useState([]);

  useEffect(() => {
    async function fetchCartoon() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
        );
        const data = await res.json();
        setCartoon(data);
      } catch (error) {
        console.error("Error fetching cartoon:", error);
      }
    }

    async function fetchTrailer() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
        );
        const data = await res.json();
        const trailer = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer ? trailer.key : null);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    }

    if (id) {
      fetchCartoon();
      fetchTrailer();
    }
  }, [id]);

  if (!cartoon) return <p className="text-center mt-10">⏳ Yuklanmoqda...</p>;
const {poster_path, title, release_date, overview, vote_average} = cartoon
  return (
    <main className="bg-gray-100 text-gray-900 dark:bg-black dark:text-white min-h-screen p-6 transition-colors">
      <BackButton />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 mt-6">
        <img
          src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${poster_path}`}
          alt={title}
          className="rounded-lg shadow-lg w-full md:w-[300px] object-cover"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {release_date}
          </p>

          <p className="mt-4 leading-relaxed">{overview}</p>

          <p className="mt-4 text-yellow-500 font-semibold">
            ⭐ Rating: {vote_average} / 10
          </p>

          {trailerKey && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">🎬 Trailer</h2>
              <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                <iframe
                  src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Trailer}/embed/${trailerKey}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
