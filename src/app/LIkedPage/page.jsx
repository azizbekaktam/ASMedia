"use client";
import Link from "next/link";
import useLocal from "../hook/useLocal";

export default function LikesPage() {
  const [likedItems] = useLocal("likedItems", []);

  if (!likedItems || likedItems.length === 0) {
    return <p className="p-6">Hech qanday yoqtirilgan film yo‘q 🙂</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">❤️ Liked Movies</h1>
      <ul className="space-y-2">
        {likedItems.map((movie) => (
          <li key={movie.id} className="p-4 border rounded-md">
            <Link href={`/Movies/${movie.id}`} className="text-blue-600">
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
