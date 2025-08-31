"use client";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_Project_TmdApi_Api;
const API_KEY = process.env.NEXT_PUBLIC_Project_TmdApi_Api_Key;

const getAppData = () => {
  const data = localStorage.getItem("asmedia.local");
  return data ? JSON.parse(data) : { token: null, likedItems: [] };
};

const saveAppData = (data) => {
  localStorage.setItem("asmedia.local", JSON.stringify(data));
};

export default function LikedPage() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const data = getAppData();

    // tokenni saqlab qo‘yamiz
    if (!data.token) {
      data.token = "my-auto-token";
      saveAppData(data);
    }

    setToken(data.token);
    fetchLikedMovies(data.likedItems);
  }, []);

  const fetchLikedMovies = async (ids) => {
    if (!ids.length) return;

    const responses = await Promise.all(
      ids.map((id) =>
        fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
          .then((res) => res.json())
      )
    );

    setLikedMovies(responses);
  };

  const removeLike = (id) => {
    const data = getAppData();
    const updated = data.likedItems.filter((item) => item !== id);
    data.likedItems = updated;
    saveAppData(data);
    setLikedMovies(likedMovies.filter((movie) => movie.id !== id));
  };

  return (
    <div>
      <h1>❤️ Liked Movies</h1>
      <p><strong>Token:</strong> {token}</p>

      {likedMovies.length > 0 ? (
        <ul>
          {likedMovies.map((movie) => (
            <li key={movie.id} style={{ marginBottom: "15px" }}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                width={100}
              />
              <div>
                <strong>{movie.title}</strong> ({movie.release_date})
                <p>{movie.overview?.slice(0, 100)}...</p>
                <button
                  onClick={() => removeLike(movie.id)}
                  style={{ marginTop: "5px" }}
                >
                  ❌ Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Liked movies yo‘q</p>
      )}
    </div>
  );
}
