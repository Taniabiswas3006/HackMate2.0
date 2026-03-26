/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00537A',
        'primary-hover': '#00425F',
        secondary: '#F3A102',
        'secondary-hover': '#D88F02',
        accent: '#00537A', // Use primary as accent
        highlight: '#F3A102', // Use secondary as highlight
        main: '#F8FAFF',
        card: '#FFFFFF',
        section: '#F3A1021A', // secondary with opacity for subtle backgrounds
        heading: '#00537A',
        body: '#00537A99', // primary with opacity for body text
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 16px 0 rgba(124,157,255,0.08)',
        'soft-lg': '0 4px 24px 0 rgba(124,157,255,0.12)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}
