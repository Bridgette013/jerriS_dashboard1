/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Jerri S. Brand Colors
        'brand-onyx': '#0A0A0A',           // Primary dark
        'brand-carbon': '#1F1F1F',          // Secondary dark / surfaces
        'brand-purple': '#5F00B8',          // Ultrasonic Blue (accent)
        'brand-lavender': '#C485FF',        // Bright Lavender (highlight)
        'brand-aqua': '#60E1E0',            // Pearl Aqua (success/pop)
        'brand-grey': '#E0E0E0',            // Alabaster Grey (borders/muted)
        'brand-white': '#FFFFFF',           // White (text on dark)
        
        // Semantic mappings
        'brand-primary': '#5F00B8',         // Main accent
        'brand-accent': '#60E1E0',          // Secondary accent
        'brand-success': '#60E1E0',         // Success states
        'brand-surface': '#1F1F1F',         // Card backgrounds
        'brand-text': '#FFFFFF',            // Primary text
        'brand-muted': '#E0E0E0',           // Muted text
        'brand-divider': '#2A2A2A',         // Subtle dividers
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],        // Clean, modern
        display: ['Montserrat', 'sans-serif'],  // Headers - bold & stylish
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #5F00B8 0%, #60E1E0 100%)',
        'gradient-purple': 'linear-gradient(135deg, #5F00B8 0%, #C485FF 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A0A0A 0%, #1F1F1F 100%)',
      }
    },
  },
  plugins: [],
}