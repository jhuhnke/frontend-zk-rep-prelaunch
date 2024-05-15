/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'custom-pink': '#ffd0d1',
        'custom-purple': '#c7b2ff',
        'custom-beige': '#ffe7bf',
        'deep-blue': '#312e81', 
        'pink-300': '#ff95a1',
        'pink-500': '#ff5467',
        'purple-800': '#312e81',
        'black-56': 'rgba(0,0,0,.56)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.7) 10%, rgba(255, 231, 191, 0.7) 50%, rgba(251, 207, 232, 0.7) 75%, rgba(224, 195, 252, 0.7) 100%)',
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        'start': '#fbcfe8',
        'end': '#e0c3fc',
      }),
    },
  },
  plugins: [],
}

