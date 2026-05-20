/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        unick: ['Unick', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          green: '#0d3f2a',
          'green-light': '#16543a',
          'green-dark': '#06271a',
          gold: '#c5a880',
          'gold-light': '#e2cfa7',
          'warm-bg': '#faf9f6',
        }
      }
    },
  },
  plugins: [],
}
