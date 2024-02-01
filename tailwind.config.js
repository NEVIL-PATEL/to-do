/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        font_black: "#000000",
        dark: "#0c4a6e",
        light: "#0e7490",
        button_color: "#E3F8F6",
        btnClip_hover: "#D2F0EB",
        red: "#991B1B",
        light_red: "#EF4444",
      },
    },
    fontFamily: {
      Nunito: ["'Nunito', sans-serif"]
    },

  },

  plugins: [],
}