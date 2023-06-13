/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'Roboto': ['Roboto', 'sans-serif'],
      'Gothic': ['Pathway Gothic One', 'sans-serif']
    },
    extend: {
      spacing:{
        '33': '8.25rem',
        '34': '8.50rem',
        '35': '8.75rem'
      },
      colors: {
        'textWhite': "#D3D3D3",
        'notifRed': "#CC0000",
        'pVidCompBlack': "#323232",
        'almostBlack': '#0F0F0F',
        'ytRed': '#FF0000',
        'highlightBlack': '#272727',
        'gray': '#3d3d3d',
        'searchBarGray': '#222222',
        'highlightBlue': '#377CB7'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
}