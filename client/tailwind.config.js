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
          dim: 'rgba(0,212,255,0.15)',
          glow: 'rgba(0,212,255,0.4)',
        },
        violet: {
          brand: '#7c3aed',
          dim: 'rgba(124,58,237,0.15)',
        },
        ink: {
          950: '#0a0a0f',
          900: '#111118',
          800: '#1a1a28',
          700: '#252535',
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
