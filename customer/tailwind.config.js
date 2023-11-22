/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.css",
    "./src/**/**/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/App.js",
    "./public/index.html",
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
      },
    },
  },
  plugins: [],
}

