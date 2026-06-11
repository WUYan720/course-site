/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        cream: {
          50: "#FFFDF7",
          100: "#FFF9EB",
          200: "#FFF0D4",
          300: "#FFE4BA",
        },
        softpink: {
          100: "#FFE8F0",
          200: "#FFD1E1",
          300: "#FFBCD0",
          500: "#F06292",
          600: "#EC407A",
          700: "#D81B60",
        },
        softcyan: {
          100: "#E8F8F5",
          200: "#D1F0E9",
          300: "#BAE8DE",
          500: "#26A69A",
          600: "#00897B",
          700: "#00695C",
        },
        warm: {
          50: "#FFF8F0",
          100: "#FFEDE0",
        }
      },
      borderRadius: {
        "3xl": "2rem",
        "4xl": "3rem",
      }
    },
  },
  plugins: [],
};
