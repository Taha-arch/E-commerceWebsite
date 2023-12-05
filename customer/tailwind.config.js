/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.css",
    "./src/**/**/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/App.js",
    "./public/index.html",
    "./src/styles/*.{css,scss}", // Assuming your custom styles are in a 'styles' directory
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
        'Playfair': ['Playfair Display', 'sans-serif'],
        'Lora': ['Lora', 'sans-serif'],
        'Poppins': ['Poppins', 'sans-serif'],
        'Dubiel' : ['Dubiel', 'sans-serif'],
        'karla' : ['karla', 'sans-serif'],
        'Karla' : ['Karla', 'sans-serif'],
      },
      colors: {
        truegreen: "#2F5951",
        truegreentint: "#587A73",
        primary: " #f3f3f3",
        coffe: "#EBE0DB"
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
});

