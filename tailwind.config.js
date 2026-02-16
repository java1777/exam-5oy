/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "390px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      fontFamily: {
        ubuntu: ["Ubuntu"],
      },
      boxShadow: {
        primary: "0px 0px 23px 0px #9494942B",
      },
    },
  },
  plugins: [],
};
