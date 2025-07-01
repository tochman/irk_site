export default {
  plugins: {
    tailwindcss: {},    /* TailwindCSS plugin (no extra config) */
    autoprefixer: {},   /* Autoprefixer plugin (no extra config) */
    'postcss-rtlcss': {
      // Only generate RTL CSS for Persian language
      // This will generate logical properties for better RTL support
      mode: 'combined', // Creates both LTR and RTL versions
      ltrPrefix: '[dir="ltr"]',
      rtlPrefix: '[dir="rtl"]',
      bothPrefix: '',
      // Ignore certain properties that shouldn't be flipped
      safelist: {
        // Don't flip these Tailwind classes
        'border-radius': true,
        'transform': true,
        'box-shadow': false
      }
    },
  },
};