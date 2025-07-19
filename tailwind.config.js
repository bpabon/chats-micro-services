const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');
const aspectRatio = require('@tailwindcss/aspect-ratio');
const scrollbar = require('tailwind-scrollbar');

module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './src/**/*.css', // si usas CSS directamente
  ],
  safelist: ['space-y-6', 'ease-in', 'duration-100', 'transition'],
  theme: {
    extend: {},
  },
  plugins: [forms, typography, aspectRatio, scrollbar],


}
