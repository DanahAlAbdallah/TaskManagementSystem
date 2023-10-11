/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'white': '#ffffff', 
      },
      colors:{
        'primary': '#818cf8'
      }
    },
  },
  plugins: [],
}