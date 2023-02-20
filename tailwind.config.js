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
    extend: {},
    colors: {
      ajcYellow: {
        DEFAULT: "#ccb76b",
        dark: "#99873e", //"#99873e",
        light: "#ffe99a", //"#ffe99a",
      },
      ajcBlue: {
        DEFAULT: "#233755",
        dark: "#00112c",
        light: "#4f6182",
      },
    },
  },
  plugins: [require("daisyui")],
  darkMode: ["class", '[data-theme="dark"]'],
  daisyui: {
    themes: ["light", "dark"],
  },
};
