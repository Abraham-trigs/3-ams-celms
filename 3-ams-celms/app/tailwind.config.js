/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f2f2f2",
        primary: "#014987",
        primaryHover: "#236aa9",
        secondary: "#660033",
        secondaryHover: "#990a58",
      },
    },
  },
  plugins: [],
};
