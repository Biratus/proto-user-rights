/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
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
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#233755",
          secondary: "#395D75",
          accent: "#ccb76b",
          "base-200": colors.indigo[100],
          "base-300": colors.indigo[200],
          info: "#3aa9ce",
          success: "#69c352",
          warning: "#c2592d",
          error: "#b33452",
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#4F5F77",
          secondary: "#063449",
          accent: "#ccb76b",
          // neutral: "#181830",
          info: "#007a9d",
          success: "#349222",
          warning: "#8c2b01",
          error: "#7e002a",
        },
      },
    ],
  },
};
