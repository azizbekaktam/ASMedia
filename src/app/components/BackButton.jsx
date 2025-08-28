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
  {
    /* <div className="relative w-80 max-w-md">
  <input
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={handleChange}
    className="w-full rounded-xl border border-gray-300 
               bg-gray-50 px-4 py-2 text-gray-900 placeholder-gray-500
               shadow-sm focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 
               dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 
               dark:placeholder-gray-400 transition-all"
  />

  {loading && query && (
    <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-900 
                    rounded-xl shadow-lg p-3 z-20 text-center text-gray-500 dark:text-gray-400">
      <Spinder />
    </div>
  )}

  {results.length > 0 && query && (
    <ul className="absolute left-0 right-0 mt-1 
                   bg-white dark:bg-gray-900 rounded-xl shadow-lg 
                   max-h-64 overflow-auto z-20 divide-y divide-gray-200 dark:divide-gray-700">
      {results.map((movie) => (
        <li
          key={movie.id}
          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 
                     cursor-pointer transition-colors"
        >
          <Link
            href={`/Movies/${movie.id}`}
            onClick={() => setQuery("")}
            className="block"
          >
            <p className="font-medium">
              {movie.title}{" "}
              {movie.release_date ? (
                <span className="text-sm text-gray-500">
                  ({movie.release_date.split("-")[0]})
                </span>
              ) : null}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )}

  {results.length === 0 && query && !loading && (
    <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-900 
                    rounded-xl shadow-lg p-3 z-20 text-center text-gray-500 dark:text-gray-400">
      No results found
    </div>
  )}
</div> */
  }
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
  ⬅ Orqaga
</button>


  );
}
