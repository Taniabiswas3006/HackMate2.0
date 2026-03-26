/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00537A',
        'primary-hover': '#00425F',
        secondary: '#D9A600',
        'secondary-hover': '#B8860B',
        highlight: '#D9A600',
        section: '#D9A6001A',
        main: '#F8FAFF',
        card: '#FFFFFF',
        section: '#FFC2001A',
        heading: '#00537A',
        body: '#00537ACC',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 16px 0 rgba(0,83,122,0.08)',
        'soft-lg': '0 4px 24px 0 rgba(0,83,122,0.12)',
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
