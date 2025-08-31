"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";

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
  className="px-5 py-2.5 rounded-lg font-semibold
             bg-gradient-to-r from-gray-200 to-gray-300 
             text-gray-800 hover:from-gray-300 hover:to-gray-400
             dark:from-gray-700 dark:to-gray-800 
             dark:text-white dark:hover:from-gray-600 dark:hover:to-gray-700
             transition-all shadow-sm hover:shadow-md"
>
<HiArrowLeft />
</button>


  );
}
