/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // yoki "media"
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // agar Next.js 13 App Router ishlatsang
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
