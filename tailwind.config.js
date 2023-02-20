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
        dark: "#8E804A", //"#99873e",
        light: "#D6C588", //"#ffe99a",
      },
      ajcBlue: {
        DEFAULT: "#233755",
        dark: "#18263B",
        light: "#4F5F77",
      },
    },
  },
  plugins: [require("daisyui")],
  darkMode: ["class", '[data-theme="dark"]'],
  daisyui: {
    themes: ["light", "dark"],
  },
};
