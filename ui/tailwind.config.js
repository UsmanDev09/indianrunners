/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      // Configure your color palette here
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      violet: "#416788",
      "light-pink": "#B5BAD0",
      "dark-green": "#283F53",
      "light-blue": "#E7E4F8",
      "blue-text": "#E0E0E2",
      pink: "#7389AE",
      input: "#E7E6EF",
      prod: "#F6F7FB",
      prodblue: "#2F1AC4",
      green: "#81D2C7",
      "violet-d": "#0D151C",
      "pink-d": "#31877B",
    },
    extend: {},
  },
  plugins: [],
};
