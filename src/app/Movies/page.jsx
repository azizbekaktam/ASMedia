'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinder from '../components/Spinder';
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import MovieList from "../components/MovieList";

export default function Movies() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/'); 
    } else {
      setLoading(false); 
    }
  }, [router]);

  if (loading) {
    return <Spinder/>
  }

  return (
    <main className=' bg-gray-900 dark:bg-white'>
     <Navbar/>
      <Slider />
      <MovieList />
    </main>
  );
}
