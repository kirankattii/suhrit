/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        suhrhit: {
          primary: "#173F35",
          secondary: "#8BAF9F",
          background: "#F7F7F3",
          surface: "#FFFFFF",
          accent: "#E8B89A",
          text: "#17211F",
          muted: "#66736F",
          light: "#98A29F",
          border: "#E4E9E6",
          error: "#C95D5D",
        },
      },
    },
  },
  plugins: [],
};