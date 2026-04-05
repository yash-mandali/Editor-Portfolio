import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#00d4ff',
          dim: 'rgba(0,212,255,0.2)',
          glow: 'rgba(0,212,255,0.5)',
        },
        violet: {
          brand: '#ff4757',
          dim: 'rgba(255,71,87,0.2)',
        },
        ink: {
          950: '#0a0a0f',
          900: '#1a1a28',
          800: '#252535',
          700: '#303040',
        },
        cream: {
          50: '#f8f7f4',
          100: '#f0ede8',
          200: '#e0dbd4',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
