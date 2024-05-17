/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '51rem': '51rem',
        '810px': '810px', // custom width 
        '626px': '626px',
        '190px': '190px',

      },
    },
  },
  plugins: [],
}

