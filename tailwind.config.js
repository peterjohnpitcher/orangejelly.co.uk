/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#FF6B35',
          light: '#FF8555',
          dark: '#E55125',
        },
        teal: {
          DEFAULT: '#2C5F5F',
          light: '#3C6F6F',
          dark: '#1C4F4F',
        },
        cream: {
          DEFAULT: '#FFF5EB',
          light: '#FFFBF5',
          dark: '#FFF0E0',
        },
        charcoal: {
          DEFAULT: '#2D2D2D',
          light: '#3D3D3D',
          dark: '#1D1D1D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-stripe': 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)'
      },
    },
  },
  plugins: [],
}