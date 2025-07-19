/** @type {import('tailwindcss').Config} */
export default {
 darkMode: 'class', // Enable dark mode support
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

