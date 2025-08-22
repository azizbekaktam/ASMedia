"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinder from "./Spinder";

export default function CartoonSlider() {
  const [cartoons, setCartoons] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/discover/movie?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&with_genres=16&language=en-US&page=1`
      )
      .then((res) => setCartoons(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  const nextSlide = () => {
    if (cartoons.length > 0) {
      setCurrent((prev) => (prev + 1) % cartoons.length);
    }
  };

  const prevSlide = () => {
    if (cartoons.length > 0) {
      setCurrent((prev) => (prev - 1 + cartoons.length) % cartoons.length);
    }
  };

  if (!cartoons.length)
    return (
      <p className="text-center mt-10">
        <Spinder />
      </p>
    );

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-md">
      {/* 🎬 Cartoon slide image */}
      <img
        src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_SliderImg}/t/p/original${cartoons[current].backdrop_path}`}
        alt={cartoons[current].title}
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* ◀ Prev button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 -translate-y-1/2 
                 bg-black/40 hover:bg-black/60 
                 text-white px-3 py-1 rounded-full 
                 backdrop-blur-sm transition-colors"
      >
        ◀
      </button>

      {/* ▶ Next button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 -translate-y-1/2 
                 bg-black/40 hover:bg-black/60 
                 text-white px-3 py-1 rounded-full 
                 backdrop-blur-sm transition-colors"
      >
        ▶
      </button>

      {/* 🔘 Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {cartoons.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === current
                ? "bg-yellow-400 shadow-lg"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
