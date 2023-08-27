/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
      violet: "#7e33e0",
      "light-pink": "#EEEFFB",
      black: "#000000",
      "light-blue": "#E7E4F8",
      "blue-text": "#8A8FB9",
      pink: "#FB2E86",
      input: "#E7E6EF",
      prod: "#F6F7FB",
      prodblue: "#2F1AC4",
      green: "#08D15F",
    },
    extend: {},
  },
  plugins: [],
};
