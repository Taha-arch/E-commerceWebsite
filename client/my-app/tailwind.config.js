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
        primary: "#61a5f9",
        secondary: "#FFF4EA",
        'whitesmoke': '#f5f5f5',
        'black':'#141415',
        'green' : '#2F5951',
        customGray: '#F3F3F3',
        customBlue: '#5570F1',
        lightgreen: '#46C716'
      },
      fontFamily: {
        'VarelaRound': ['VarelaRound', 'sans-serif'],
      },
      
      borderRadius: {
        '3xl': '1.5rem', // Adjust the radius size as needed
      }
    },
  },
  plugins: [
    
  ],
}

