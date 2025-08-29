'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinder from './components/Spinder';
import MoviesPage from './Movies/page';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/LoginPage"); // login bo‘lmasa login pagega yo‘naltiradi
    } else {
      setLoading(false); // token bor bo‘lsa asosiy sahifa ochiladi
    }
  }, [router]);

  if (loading) {
    return <Spinder />;
  }

  return (
<MoviesPage/>
  );
}
