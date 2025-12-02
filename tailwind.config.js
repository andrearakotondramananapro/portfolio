/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Palette de couleurs personnalisée
      colors: {
        charbon: '#322d29',
        bordeaux: '#72383d',
        taupe: '#ac9c8d',
        beige: '#d1c7bd',
        gris: '#d9d9d9',
        creme: '#efe9e1',
        // Vert sauge avec du caractère - s'harmonise avec la palette terre
        sauge: '#5B7B5B',
        'sauge-light': '#7A9A7A',
        'sauge-dark': '#4A6A4A',
      },
      // Polices avec du caractère
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      // Animations personnalisées
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'shine': 'shine 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      // Effets de flou pour glassmorphism
      backdropBlur: {
        xs: '2px',
      },
      // Ombres personnalisées
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(50, 45, 41, 0.1)',
        'glass-lg': '0 8px 32px 0 rgba(50, 45, 41, 0.2)',
        'glow': '0 0 20px rgba(114, 56, 61, 0.3)',
        'glow-lg': '0 0 40px rgba(114, 56, 61, 0.4)',
        'glow-sauge': '0 0 20px rgba(91, 123, 91, 0.3)',
      },
      // Espacements personnalisés
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      // Largeurs maximales pour grands écrans
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      // Breakpoints pour très grands écrans
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
    },
  },
  plugins: [],
}
