/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'around': '0 0 4px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        'body': ['open-sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}

