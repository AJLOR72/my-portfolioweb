module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica Neue', 'Arial'],
        display: ['Orbitron', 'Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        cosmic: {
          900: '#030317',
          800: '#07102a',
          700: '#0b1933',
          600: '#2a2b40'
        },
        glow: '#7c6cff'
      },
      boxShadow: {
        glow: '0 8px 30px rgba(124,108,255,0.25)'
      }
    },
  },
  plugins: [],
}
