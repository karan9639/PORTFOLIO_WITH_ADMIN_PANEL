/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 60px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        glow: 'radial-gradient(circle at top, rgba(45, 212, 191, 0.16), transparent 55%)',
      },
    },
  },
  plugins: [],
};
