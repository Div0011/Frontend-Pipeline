/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#06080F',
        'deep-charcoal': '#111827',
        'aura-glow': '#2D5BFF',
        'off-white-text': '#E5E7EB',
        'muted-gray': '#9CA3AF',
      },
      fontFamily: {
        'cinematic-display': ['Playfair Display', 'serif'],
        'system-sans': ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'tech-mono': ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}
