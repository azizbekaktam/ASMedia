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
      router.push("/LoginPage");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <Spinder />;
  }

  return (
<MoviesPage/>
  );
}
