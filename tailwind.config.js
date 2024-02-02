/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#09090B",
        secondary: "#27272A",
        alternative: "#27272A",
        hover: "#27272A",
        "light": "#FAFAFA",
        "light-alt": "#46464A",
      },
    },
  },
  plugins: [],
};
