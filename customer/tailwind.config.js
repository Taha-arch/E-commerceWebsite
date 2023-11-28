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
      colors: {
        'primary_bg': '#f3f3f3',
      }
    },
  },
  plugins: [],
}

