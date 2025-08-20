"use client";

import BackButton from "@/app/components/BackButton";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p className="text-center text-lg text-gray-600 dark:text-gray-300 p-6">⏳ Yuklanmoqda...</p>;

  if (!movie) return <p className="text-red-500 p-6">Film topilmadi ❌</p>;

  const { poster_path, title, release_date, vote_average, overview } = movie;

  return (
    <main className="bg-gray-100 text-gray-900 dark:bg-black dark:text-gray-200 min-h-screen p-6 transition-colors">
      <BackButton />
 
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 mt-6">
        <img
          src={
            poster_path
              ? `${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${poster_path}`
              : "/no-poster.png"
          }
          alt={title}
          className="rounded-lg shadow-lg w-full md:w-[300px] object-cover"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-600 dark:text-gray-400">{release_date}</p>

          <p className="mt-4 leading-relaxed">{overview}</p>

          <p className="mt-4 text-yellow-500 font-semibold">
            ⭐ Rating: {vote_average} / 10
          </p>

          {trailer && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">🎬 Trailer</h2>
              <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
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
