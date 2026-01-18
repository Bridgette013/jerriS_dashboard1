/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tiffany Twisted luxury theme colors
        'tiff-pink': '#F8BBD9',
        'tiff-rose': '#E91E63', 
        'tiff-black': '#0A0A0A',
        'tiff-charcoal': '#1A1A1A',
        'tiff-surface': '#2A2A2A',
        'tiff-gold': '#FFD700',
        'tiff-champagne': '#F7E7CE',
        'tiff-text': '#F5F5F5',
        'tiff-muted': '#B0B0B0',
        'tiff-divider': '#3A3A3A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
      backgroundImage: {
        'gradient-tiff': 'linear-gradient(135deg, #F8BBD9 0%, #E91E63 50%, #FFD700 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A0A0A 0%, #2A2A2A 100%)',
      }
    },
  },
  plugins: [],
}