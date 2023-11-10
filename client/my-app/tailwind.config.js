/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{js,jsx,ts,tsx}",
    "./src/**/*.css",
    "./src/**/**/**/*.js",
    "./src/**/*.jsx",
    "./src/App.js",
    "./public/index.html",
    "./src/styles/*.{css,scss}", // Assuming your custom styles are in a 'styles' directory
  ],
  
  theme: {
    extend: {
      colors: {
        primary: "#61a5f9",
        secondary: "#FFF4EA"
    },
  },
  plugins: [],
}
};
