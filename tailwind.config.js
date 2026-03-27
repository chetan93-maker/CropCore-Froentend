/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16a34a',      // Green
        secondary: '#f97316',     // Orange
        accent: '#0284c7',        // Blue
        background: '#f9fafb',    // Light gray
        surface: '#ffffff',        // White
      },
    },
  },
  plugins: [],
}