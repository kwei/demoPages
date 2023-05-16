/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      ml: '1200px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '0.75': '0.1875rem',          // 3px
        '1.25': '0.3125rem',          // 5px
        '1.75': '0.4375rem',          // 7px
        '3.5': '0.875rem',            // 14px
        '3.75': '0.9375rem',          // 15px
        '4.25': '1.0625rem',          // 17px
        '4.5': '1.125rem',            // 18px
        '5.25': '1.3125rem',          // 21px
        '5.75': '1.4375rem',          // 23px
        '7.5': '1.875rem',            // 30px
        '8.5': '2.125rem',            // 34px
        '6.25': '1.5625rem',          // 25px
        '12.5': '3.125rem',           // 50px
        '14.5': '3.625rem',           // 58px
        '15': '3.75rem',              // 60px
        '18': '4.5rem',               // 72px
        '21': '5.25rem',              // 84px
        '22.5': '5.625rem',           // 90px
        '28': '7rem',                 // 112px
        '30': '7.5rem',               // 120px
        '32.5': '8.125rem',           // 130px
        '35': '8.75rem',              // 140px
        '40': '10rem',                // 160px
        '25': '6.25rem',              // 100px
        '37.5': '9.375rem',           // 150px
        '45': '11.25rem',             // 180px
        '50': '12.5rem',              // 200px
        '52.5': '13.125rem',          // 210px
        '54.75': '13.6875rem',        // 219px
        '75': '18.75rem',             // 300px
        '88': '22rem',                // 352px
        '165': '41.25rem',            // 660px
        '175': '43.75rem',            // 700px
        '180': '45rem',               // 720px
        '185': '46.25rem',            // 740px
        '190': '47.5rem',             // 760px
        '195': '48.75rem',            // 780px
        '200': '50rem',               // 800px
        '205': '51.25rem',            // 820px
        '210': '52.5rem',             // 840px
        '215': '53.75rem',            // 860px
        '220': '55rem',               // 880px
        '225': '56.25rem',            // 900px
        '230': '57.5rem',             // 920px
        '235': '58.75rem',            // 940px
        '240': '60rem',               // 960px
        '332.5': '83.125rem',         // 1330px
        '4/100': '4%',                // 4%
        '1/8': '12.5%',               // 12.5%
        '16/100': '16%',              // 16%
        '30/100': '30%',              // 30%
        '35/100': '35%',              // 35%
        '40/100': '40%',              // 40%
        '45/100': '45%',              // 45%
        '48/100': '48%',              // 48%
        '65/100': '65%',              // 65%
        '70/100': '70%',              // 70%
        'fill-available': 'stretch',
      },
      borderRadius: {
        '0.75': '0.1875rem',          // 3px
        '1.25': '0.3125rem',          // 5px
        '1.75': '0.4375rem',          // 7px
        '2.5': '0.625rem',            // 10px
        '5': '1.25rem'                // 20px
      },
      maxWidth: {
        'screen-500': '500px',
        'screen-600': '600px',
        'screen-700': '700px',
        'screen-850': '850px',
        'screen-1150': '1150px',
        'screen-1330': '1330px',
        'ml': '1200px'
      },
    },
  },
  plugins: [],
}
