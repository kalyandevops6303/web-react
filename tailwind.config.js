const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: ['class'],
  content: [
    './index.html',
    './src/flexternships/app/**/*.{js,jsx,ts,tsx}', // include all js, jsx, ts, tsx files
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        white: {
          DEFAULT: '#fff',
          fa: '#fafafa',
        },
        yellow: {
          DEFAULT: '#FFD600',
          secondary: {
            500: '#FBC02D',
          },
        },
        orange: {
          DEFAULT: '#FF9F43',
          dark: '#FF6D00',
          light: '#FF6D001F',
        },
        violet: {
          DEFAULT: '#584CDB',
        },
        teal: {
          DEFAULT: '#00BBB7',
        },
        grey: {
          DEFAULT: '#6E6B7B',
          light: '#F8F8F8',
          border: '#EBE9F1',
          background: '#F3F2F7',
          heading: '#5E5873',
          muted: '#B9B9C3',
          c2: '#C2C2C2',
          50: '#E6E7E7',
          200: '#B4B7B8',
          300: '#9C9FA1',
          500: '#838889',
          600: '#515759',
          700: '#394042',
          800: '#757575',
          loadingText: '#9E9E9E',
        },
        skyblue: {
          DEFAULT: '#00B0FF',
          light: '#00B0FF1F',
        },
        success: '#28C76F',
        error: '#EA5455',
        trublue: {
          DEFAULT: '#0065C1',
          review: '#03D8F5',
          secondary: {
            500: '#0185E4',
          },

          disabled: '#99C1E6',
          light: '#E0F0FB',
          a1: '#0065C1',
          a3: '#00B2FF',
          a4: '#23DFEB',
        },
        text: {
          dark: '#071013',
        },
        primary: '#0185E4',
        'primary-light': '#0185E41F',
        dark: {
          DEFAULT: '#071013',
          100: '#394042',
          200: '#6A7071',
          300: '#838889',
        },
        border: {
          DEFAULT: '#E6E7E7',
        },
        purple: {
          DEFAULT: '#7367F0',
        }
      },
      width: {
        8.5: '2.125rem',
        30: '7.5rem',
        65: '16.125rem',
      },
      minWidth: {
        8.5: '2.125rem',
        30: '7.5rem',
      },
      height: {
        8.5: '2.125rem',
      },
      padding: {
        13: '3.25rem',
      },
      margin: {
        17: '4.25rem',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
        body: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
      },
      opacity: {
        12: '0.12',
      },
      lineHeight: {
        4.5: '18px',
        5.5: '22px',
      },
      borderRadius: {
        5: '5px',
        7: '7px',
        10:"10px",
        52: '52px',
      },
      borderWidth: {
        1: '1px',
      },
      boxShadow: {
        card: '0px 4px 24px 0px rgba(0, 0, 0, 0.06)',
        table: '0px 4px 6px -1px rgba(0, 0, 0, 0.10)',
        'restricted-navbar': '0px 2px 8px 0px rgba(58, 105, 187, 0.15)',
        'primary-button': '0px 6px 16px 0px rgba(0, 101, 193, 0.50)',
        'custom-blue': '0px 2px 4px 0px rgba(1, 133, 228, 0.40)',
        'custom-pieChart-shadow': '0px 2px 8px 0px rgba(0, 0, 0, 0.16)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontSize: {
        '2xs': ['10px', '12px'],
        '3xs': ['8px', '8px']
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
