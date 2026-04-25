/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          200: "#b6d4ff",
          300: "#85b4ff",
          400: "#5189ff",
          500: "#2f63ff",
          600: "#1f47e0",
          700: "#1937b0",
          800: "#172d8a",
          900: "#152870",
        },
      },
    },
  },
  plugins: [],
};
