/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        gold: {
          50: '#fefdf7',
          100: '#fdf9e3',
          200: '#faf0bc',
          300: '#f5e285',
          400: '#edcc45',
          500: '#e2b824',
          600: '#c49a18',
          700: '#9c7415',
          800: '#7d5c18',
          900: '#694d1a',
        },
        obsidian: {
          50: '#f6f6f7',
          100: '#e2e2e5',
          200: '#c4c4cb',
          300: '#9d9daa',
          400: '#767688',
          500: '#5c5c70',
          600: '#4a4a5a',
          700: '#3d3d4a',
          800: '#333340',
          900: '#0a0a0f',
          950: '#050508',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'cursor-trail': 'cursorTrail 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(226, 184, 36, 0.3)' },
          '100%': { boxShadow: '0 0 60px rgba(226, 184, 36, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(226,184,36,0.4), transparent)',
        'premium-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
      },
    },
  },
  plugins: [],
}
