/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.css",
    "./src/**/**/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/App.js",
    "./public/index.html",
<<<<<<< HEAD
    "./src/styles/*.{css,scss}",
  ],
  theme: {
    extend: {
      colors: {
        'whitesmoke': '#f5f5f5',
        black: '#141415',
        green : '#2F5951',
        'rose': '#EBE0DB',
=======
    "./src/styles/*.{css,scss}", // Assuming your custom styles are in a 'styles' directory
  ],
  theme: {
    extend: {
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
        'Playfair': ['Playfair Display', 'sans-serif'],
        'Lora': ['Lora', 'sans-serif'],
        'Poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        truegreen: "#2F5951",
        truegreentint: "#587A73",
        primary: " #f3f3f3"
>>>>>>> 71052738551363839d47003122c5485ebc67db1a
      },
    },
  },
  plugins: [],
}

