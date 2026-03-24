/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7C9DFF',
        'primary-hover': '#5A7CFF',
        secondary: '#C8B6FF',
        accent: '#A8E6CF',
        highlight: '#FFB7C5',
        main: '#F8FAFF',
        card: '#FFFFFF',
        section: '#EEF2FF',
        heading: '#1E293B',
        body: '#64748B',
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
