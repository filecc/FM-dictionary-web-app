/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './components/**/*.{html,js}',
    './pages/**/*.{html,js}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        'fg-pink': '#A445ED',
      },
      fontFamily: {
        
      }
    },
  },
  plugins: [],
}
