"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinder from "../components/Spinder";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import MovieList from "../components/MovieList";

export default function Movies() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <Spinder />;
  }

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        <Slider />
        <MovieList />
      </div>
    </main>
  );
}
