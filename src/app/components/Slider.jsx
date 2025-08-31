"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinder from "./Spinder";
import { HiArrowCircleRight, HiArrowCircleLeft  } from "react-icons/hi";

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
<div className="relative w-full h-[450px] overflow-hidden rounded-2xl shadow-xl">
  <img
    src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_SliderImg}/t/p/original${movies[current].backdrop_path}`}
    alt={movies[current].title}
    className="w-full h-full object-cover transition-transform duration-700 ease-in-out scale-105 hover:scale-110"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

  <div className="absolute bottom-16 left-10 text-white space-y-3">
    <h2 className="text-3xl font-bold drop-shadow-lg">{movies[current].title}</h2>
    {/* <button className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold shadow-md transition-colors">
      Watch Now
    </button> */}
  </div>

  <button
    onClick={prevSlide}
    className="absolute top-1/2 left-4 -translate-y-1/2 
               bg-black/40 hover:bg-black/70 
               text-white p-3 rounded-full 
               backdrop-blur-sm transition-all shadow-md"
  >
        <HiArrowCircleLeft />

  </button>

  <button
    onClick={nextSlide}
    className="absolute top-1/2 right-4 -translate-y-1/2 
               bg-black/40 hover:bg-black/70 
               text-white p-3 rounded-full 
               backdrop-blur-sm transition-all shadow-md"
  >
            <HiArrowCircleRight />

  </button>

  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
    {movies.map((_, i) => (
      <div
        key={i}
        className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
          i === current
            ? "bg-yellow-400 shadow-lg scale-110"
            : "bg-gray-300 dark:bg-gray-600 hover:bg-yellow-300"
        }`}
        onClick={() => setCurrent(i)}
      ></div>
    ))}
  </div>
</div>


  );
}
