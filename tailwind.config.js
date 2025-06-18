/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Cormorant Garamond', 'serif'],
        'heading': ['Cormorant Garamond', 'serif'],
      },
      colors: {
        // New brand color palette from coolors.co
        brand: {
          black: '#0a0908',      // Rich Black - for text and strong accents
          charcoal: '#22333b',   // Charcoal - for secondary text and borders
          linen: '#eae0d5',      // Linen - for backgrounds and subtle elements
          khaki: '#c6ac8f',      // Khaki - for highlights and warm accents
          umber: '#5e503f',      // Umber - for buttons and interactive elements
        },
        // Extend the palette with variations
        primary: {
          50: '#f7f6f5',
          100: '#eae0d5',
          200: '#d5c4b3',
          300: '#c6ac8f',
          400: '#b3926f',
          500: '#5e503f',
          600: '#4a3f32',
          700: '#3a3128',
          800: '#2a241e',
          900: '#1a1714',
          950: '#0a0908',
        },
        gray: {
          50: '#f9f8f7',
          100: '#eae0d5',
          200: '#d0c4b8',
          300: '#b8a899',
          400: '#9c8c7a',
          500: '#22333b',
          600: '#1d2e35',
          700: '#18262c',
          800: '#131e23',
          900: '#0e161a',
          950: '#0a0908',
        }
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '3px',
        'md': '4px',
        'lg': '6px',
        'xl': '8px',
        '2xl': '12px',
        '3xl': '16px',
        'full': '9999px',
      }
    },
  },
  plugins: [],
}