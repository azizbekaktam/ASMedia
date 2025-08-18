"use client";

import BackButton from "@/app/components/BackButton";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [videos, setVideos] = useState([]);

  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieRes = await axios.get(
          `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&language=en-US`
        );
        setMovie(movieRes.data);

        const videoRes = await axios.get(
          `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&language=en-US`
        );
        setVideos(videoRes.data.results);
        const foundTrailer = videoRes.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailer(foundTrailer);
      } catch (err) {
        console.error("API xatolik:", err);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <p className="text-white p-6">Yuklanmoqda...</p>;
  }
  const { poster_path, title, release_date, vote_average, overview } = movie;
  return (
<main className="bg-gray-100 text-gray-900 dark:bg-black dark:text-white min-h-screen p-6 transition-colors">
  {/* 🔙 Back Button */}
  <BackButton />

  {/* 🎥 Movie content */}
  <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 mt-6">
    {/* Poster */}
    <img
      src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${poster_path}`}
      alt={title}
      className="rounded-lg shadow-lg w-full md:w-[300px] object-cover"
    />

    {/* Movie Info */}
    <div className="flex-1">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-600 dark:text-gray-400">{release_date}</p>

      <p className="mt-4 leading-relaxed">{overview}</p>

      <p className="mt-4 text-yellow-500 font-semibold">
        ⭐ Rating: {vote_average} / 10
      </p>

      {/* Trailer */}
      {trailer && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">🎬 Trailer</h2>
          <div className="aspect-video rounded-lg overflow-hidden shadow-md">
            <iframe
              src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Trailer}/embed/${trailer.key}`}
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
