/** @type {import('tailwindcss').Config} */
const defaultFonts = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{jsx,tsx,js,ts}'],
  theme: {
    extend: {
      screens: {
        xxs: '390px', // min-width
      },
      fontFamily: {
        sans: ['Open Sans', ...defaultFonts.fontFamily.sans],
      },
      backgroundImage: {
        'main-hero-bg': 'url("/img/head-prod2.webp")',
      },
    },
  },
  daisyui: {
    themes: ['autumn'],
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
};
