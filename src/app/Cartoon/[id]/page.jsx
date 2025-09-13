"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BackButton from "@/app/components/BackButton";
import Spinder from "@/app/components/Spinder";
import LikeButton from "@/app/components/LikeButton";
import { FaStar } from "react-icons/fa";
import WatchlistButton from "@/app/components/Watchlist";

export default function CartoonDetail({ token }) {
  const { id } = useParams();
  const [cartoon, setCartoon] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    async function fetchCartoon() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&language=en-US`
        );
        const data = await res.json();
        setCartoon({ ...data, type: "multfilm" });
      } catch (error) {
        console.error("Error fetching cartoon:", error);
      }
    }

    async function fetchTrailer() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&language=en-US`
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

  if (!cartoon)
    return (
      <p className="text-center mt-10">
        <Spinder />
      </p>
    );

  const { poster_path, title, release_date, vote_average, overview } = cartoon;

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen p-8">
      <BackButton />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 mt-10">
        <div className="flex-shrink-0">
          <img
            src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}${poster_path}`}
            alt={title}
            className="rounded-2xl shadow-xl w-full md:w-[320px] object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-gray-500 mt-1">{release_date}</p>
          <p className="mt-6 text-gray-700 leading-relaxed text-lg">
            {overview}
          </p>

          <div className="mt-6 flex items-center gap-2">
            <span className="text-yellow-500 text-2xl">
              <FaStar />
            </span>
            <span className="text-lg font-semibold text-gray-800">
              {vote_average} / 10
            </span>
          </div>

          <LikeButton movie={cartoon} />
          <WatchlistButton movie={cartoon} />

          {trailerKey && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                🎬 Trailer
              </h2>
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200">
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
