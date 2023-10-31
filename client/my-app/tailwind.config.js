/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{js,jsx,ts,tsx}",
    "./src/**/*.css",
    "./src/App.js",
    "./src/**/*.jsx",
    "./public/index.html",
    "./src/styles/*.{css,scss}", // Assuming your custom styles are in a 'styles' directory
  ],
  
  theme: {
    extend: {
      colors: {
        'whitesmoke': '#f5f5f5',
        'black':'#141415',
        'green' : '#2F5951',
        customGray: '#F3F3F3',
      },
      fontFamily: {
        'playfair': ['playfair Display', 'serif'],
      },
      borderRadius: {
        '3xl': '1.5rem', // Adjust the radius size as needed
      },
    },
  },
  plugins: [
    
  ],
}

