// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './src/**/*.css', // si usas CSS directamente
  ],
  theme: {
    extend: {},
  },
  safelist: ['space-y-6'],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),
  ],

}
