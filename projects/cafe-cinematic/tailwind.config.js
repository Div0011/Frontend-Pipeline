/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cafe: {
          bg: '#F7F4F0',
          warm: '#F2EDE7',
          text: '#2C1810',
          muted: '#6B5B4F',
          accent: '#C4A77D',
          'accent-dark': '#A68B5B',
          secondary: '#8B5E3C',
          dark: '#1A0F0A',
          border: 'rgba(44, 24, 16, 0.08)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      maxWidth: {
        'content': '1400px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
