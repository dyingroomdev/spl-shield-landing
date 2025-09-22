/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // SPL Shield brand colors (green gradient from logo)
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',  // Main SPL Shield green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // SPL Shield secondary colors (darker green from logo)
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',  // Main secondary green
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // TDL Token colors (purple to orange gradient)
        tdl: {
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',  // Main TDL purple
            600: '#9333ea',
            700: '#7c3aed',
            800: '#6b21a8',
            900: '#581c87',
          },
          orange: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#f97316',  // Main TDL orange
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
          }
        },
        // Dark mode colors
        dark: {
          bg: '#0a0a0a',
          surface: '#1a1a1a',
          card: '#262626',
          text: '#ffffff',
          muted: '#a3a3a3',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'spl-gradient': 'linear-gradient(135deg, #22c55e 0%, #0d9488 100%)',
        'tdl-gradient': 'linear-gradient(135deg, #a855f7 0%, #f97316 100%)',
        'hero-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        'hero-light': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.3)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.3)',
      }
    },
  },
  plugins: [],
}