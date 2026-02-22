/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        brand: {
          purple: "#9083d5",
          "purple-dark": "#271776",
          blue: "#3939d9",
          pink: "#ff008d",
          bg: "#e5e5e5",
        },
      },
    },
  },
  plugins: [],
};
