import { addDynamicIconSelectors } from "@iconify/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    letterSpacing: {
      tight: "-.015rem",
    },
    extend: {
      colors: {
        lightGray: "#f8f9fa",
        darkGray: "#212529",
        glassWhite: "rgba(255, 255, 255, 0.1)",
      },
      height: { "hafl-screen": "50vh" },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
};
