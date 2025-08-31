"use client";

import useLocal from "../hook/useLocal";

export default function LikeButton({ movie }) {
  const [likedItems, setLikedItems] = useLocal("likedItems", []);

  const isLiked = likedItems?.some((m) => m.id === movie.id);

  const toggleLike = () => {
    let updated;
    if (isLiked) {
      updated = likedItems.filter((m) => m.id !== movie.id);
    } else {
      updated = [...likedItems, movie];
    }
    setLikedItems(updated);
  };

  return (
    <button
      onClick={toggleLike}
      className={`px-4 py-2 rounded-md text-white ${
        isLiked ? "bg-red-500" : "bg-blue-500"
      }`}
    >
      {isLiked ? "Unlike" : "Like"}
    </button>
  );
}
