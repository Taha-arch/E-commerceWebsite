/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.css",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/App.js",
    "./public/index.html",
    "./src/styles/*.{css,scss}", // Assuming your custom styles are in a 'styles' directory
  ],
  
  theme: {
    extend: {},
  },
  plugins: [],
}

