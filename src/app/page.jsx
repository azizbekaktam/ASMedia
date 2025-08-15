'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginPage from './LoginPage/page';
import Spinder from './components/Spinder';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      router.push('/Movies');  
    } else {
      setLoading(false);         
    }
  }, [router]);

  if (loading) {
    return <Spinder/>
  }

  return <LoginPage />; 
}
