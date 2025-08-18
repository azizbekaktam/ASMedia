"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from");
  const handleBack = () => {
    if (from) {
      router.push(from); 
    } else if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/movies"); 
    }
  };

  return (
   <button
  onClick={handleBack}
  className="px-4 py-2 rounded font-medium 
             bg-gray-200 text-gray-800 hover:bg-gray-300 
             dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 
             transition-colors flex items-center gap-2"
>
  ⬅ Orqaga
</button>

  );
}
