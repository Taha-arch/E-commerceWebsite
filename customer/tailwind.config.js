/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.css",
    "./src/**/**/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/App.js",
    "./public/index.html",
    "./src/styles/*.{css,scss}",
  ],
  theme: {
    extend: {
      colors: {
        'whitesmoke': '#f5f5f5',
        black: '#141415',
        green : '#2F5951',
        'rose': '#EBE0DB',
      },
    },
  },
  plugins: [],
}

