/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        garage: {
          dark: "#0a0c10",
          card: "#121620",
          border: "#1e2638",
          cyan: "#00f0ff",
          gold: "#ffb703",
          neon: "#39ff14",
          silver: "#e2e8f0"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'sans-serif']
      }
    },
  },
  plugins: [],
}
