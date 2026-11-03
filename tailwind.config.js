/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',
        secondary: '#f59e0b',
        accent: '#10b981',
        dark: '#0f172a',
        light: '#f8fafc'
      },
      fontFamily: {
        'sans': ['Poppins', 'Clear Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
