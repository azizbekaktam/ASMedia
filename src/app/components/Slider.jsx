"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinder from "./Spinder";

export default function Slider() {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/movie/popular?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&language=en-US&page=1`
      )
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  const nextSlide = () => {
    if (movies.length > 0) {
      setCurrent((prev) => (prev + 1) % movies.length);
    }
  };

  const prevSlide = () => {
    if (movies.length > 0) {
      setCurrent((prev) => (prev - 1 + movies.length) % movies.length);
    }
  };

  if (!movies.length)
    return (
      <p className="text-center mt-10">
        <Spinder />
      </p>
    );

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <img
        src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_SliderImg}/t/p/original${movies[current].backdrop_path}`}
        alt={movies[current].title}
        className="w-full h-full object-cover transition-all duration-500"
      />

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
      >
        ◀
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
      >
        ▶
      </button>

      {/* Slayd indikatorlari — hammasini ko'rsatish */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
