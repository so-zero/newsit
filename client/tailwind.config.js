const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Modak"', "system-ui"],
        body: ['"Noto Sans KR"', "sans-serif"],
      },
      colors: {
        background: "#fff",
        primary: "#fff",
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
