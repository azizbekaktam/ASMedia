// "use client";

// import BackButton from "@/app/components/BackButton";
// import Spinder from "@/app/components/Spinder";
// import axios from "axios";
// import { useParams } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function MovieDetail() {
//   const { id } = useParams();
//   const [movie, setMovie] = useState([]);
//   const [videos, setVideos] = useState([]);

//   const [trailer, setTrailer] = useState(null);

//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         const movieRes = await axios.get(
//           `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&language=en-US`
//         );
//         setMovie(movieRes.data);

//         const videoRes = await axios.get(
//           `${process.env.NEXT_PUBLIC_Project_TmdApi_Api}/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key}&language=en-US`
//         );
//         setVideos(videoRes.data.results);
//         const foundTrailer = videoRes.data.results.find(
//           (vid) => vid.type === "Trailer" && vid.site === "YouTube"
//         );
//         setTrailer(foundTrailer);
//       } catch (err) {
//         console.error("API xatolik:", err);
//       }
//     };

//     fetchMovie();
//   }, [id]);

//   if (!movie) {
//     return <p className="text-white p-6"><Spinder/></p>;
//   }
//   const { poster_path, title, release_date, vote_average, overview } = movie;
//   return (
// <main className="bg-gray-100 text-gray-900 dark:bg-black dark:text-white min-h-screen p-6 transition-colors">
//   <BackButton />

//   <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 mt-6">
//     <img
//       src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${poster_path}`}
//       alt={title}
//       className="rounded-lg shadow-lg w-full md:w-[300px] object-cover"
//     />

//     <div className="flex-1">
//       <h1 className="text-3xl font-bold">{title}</h1>
//       <p className="text-gray-600 dark:text-gray-400">{release_date}</p>

//       <p className="mt-4 leading-relaxed">{overview}</p>

//       <p className="mt-4 text-yellow-500 font-semibold">
//         ⭐ Rating: {vote_average} / 10
//       </p>

//       {trailer && (
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-2">🎬 Trailer</h2>
//           <div className="aspect-video rounded-lg overflow-hidden shadow-md">
//             <iframe
//               src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Trailer}/embed/${trailer.key}`}
//               title="YouTube video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               className="w-full h-full"
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// </main>

//   );
// }

"use client";

import BackButton from "@/app/components/BackButton";
import Spinder from "@/app/components/Spinder";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

// 🔥 firebase
import { db, auth } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [user, setUser] = useState(null);

  // 👤 Foydalanuvchini tekshirish
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

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

  // ❤️ Like bosish funksiyasi
  const handleLike = async () => {
    if (!user) {
      alert("Iltimos, like qilish uchun login qiling!");
      return;
    }

    try {
      await setDoc(
        doc(db, "users", user.uid, "likedMovies", String(movie.id)),
        {
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          likedAt: new Date(),
        }
      );
      alert("Kino yoqtirilganlarga qo‘shildi! ✅");
    } catch (error) {
      console.error("Like xatolik:", error);
    }
  };

  if (!movie) {
    return (
      <p className="text-white p-6">
        <Spinder />
      </p>
    );
  }

  const { poster_path, title, release_date, vote_average, overview } = movie;

  return (
    <main className="bg-gray-100 text-gray-900 dark:bg-black dark:text-white min-h-screen p-6 transition-colors">
      <BackButton />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 mt-6">
        <img
          src={`${process.env.NEXT_PUBLIC_Project_TmdApi_Api_Img}/t/p/w500${poster_path}`}
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

          {/* ❤️ Like Button */}
          <button
            onClick={handleLike}
            className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
          >
            ❤️ Like
          </button>

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
