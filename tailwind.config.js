/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        soil:       '#0F0F0D',
        ash:        '#F5F3EF',
        earth:      '#2C2416',
        clay:       '#B5A99A',
        verdigris:  '#4A7C59',
        graphite:   '#5E5E5E',
        bone:       '#E8E4DC',
        'fresh-red': '#ED1C24',
      },
      fontFamily: {
        display: ["'Cormorant Garant'", 'Georgia', 'serif'],
        sans:    ["'DM Sans'", 'system-ui', 'sans-serif'],
        mono:    ["'DM Mono'", 'monospace'],
      },
      letterSpacing: {
        widest: '.2em',
        luxury: '.25em',
      },
    },
  },
  plugins: [],
};
