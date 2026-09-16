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
          primary: "#183059",
          secondary: "#7293B3",
          background: "#F0F5FA",
          surface: "#FFFFFF",
          accent: "#A3C4E0",
          text: "#183059",
          muted: "#647B91",
          light: "#A6B9C7",
          border: "#DDE4EB",
          error: "#D35F5F",
        },
      },
    },
  },
  plugins: [],
};