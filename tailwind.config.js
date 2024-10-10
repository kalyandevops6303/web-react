const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './index.html',
    "./src/flexternships/**/*.{js,jsx,ts,tsx}", // include all js, jsx, ts, tsx files
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        white: "#fff",
        grey: {
          DEFAULT: "#6E6B7B",
          light: "#F8F8F8",
          border: "#EBE9F1",
          background: "#F3F2F7",
          heading: "#5E5873",
          muted: "#B9B9C3",
          c2: "#C2C2C2",
          50: "#E6E7E7",
          200: "#B4B7B8",
          300: "#9C9FA1",
          500: "#6A7071",
          600: "#515759",
        },
        success: '#28C76F',
        error: "#EA5455",
        success: "#28C76F",
        trublue: {
          DEFAULT: "#0065C1",
          secondary: {
            500: "#0185E4",
          },
          disabled: "#99C1E6",
          light: "#E0F0FB",
          a1: "#0065C1",
          a3: "#00B2FF",
          a4: "#23DFEB",
        },
      },
      width: {
        8.5: "2.125rem",
        30: "7.5rem",
      },
      minWidth: {
        8.5: "2.125rem",
        30: "7.5rem",
      },
      height: {
        8.5: "2.125rem",
      },
      padding: {
        13: "3.25rem",
      },
      margin:{
        17: "4.25rem",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", ...defaultTheme.fontFamily.sans],
        body: ["var(--font-montserrat)", ...defaultTheme.fontFamily.sans],
      },
      opacity: {
        12: "0.12"
      },
      lineHeight: {
        4.5: "18px",
        5.5: "22px"
      },
      borderRadius: {
        5: '5px',
        7: '7px',
        52: '52px',
      },
      borderWidth: {
        1: '1px',
      },
      boxShadow: {
        'card': '0px 4px 24px 0px rgba(0, 0, 0, 0.06)',
        'table': '0px 4px 6px -1px rgba(0, 0, 0, 0.10)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
