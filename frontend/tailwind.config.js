/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Sheba Primary Colors
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c1d3ff',
          300: '#a2bdff',
          400: '#83a7ff',
          500: '#0d2d6d', // Deep Navy - Primary
          600: '#0a2456',
          700: '#081d47',
          800: '#051638',
          900: '#020c1f',
        },
        // Sheba Accent - Emerald/Teal
        accent: {
          50: '#f0fdf9',
          100: '#e0fbf4',
          200: '#c1f7ea',
          300: '#a2f3e0',
          400: '#83efd6',
          500: '#1dbf89', // Emerald Primary
          600: '#17956b',
          700: '#116b4d',
          800: '#0b412f',
          900: '#051611',
        },
        // Gold for Premium Feel
        gold: {
          50: '#fffbf0',
          100: '#fef7e0',
          200: '#fdefc1',
          300: '#fce7a2',
          400: '#fbdf83',
          500: '#d4a574', // Soft Gold
          600: '#a6845c',
          700: '#786344',
          800: '#4a422c',
          900: '#1c1814',
        },
        // Neutral Surfaces
        surface: {
          50: '#fafbfc',
          100: '#f4f6f8',
          200: '#e9ecf0',
          300: '#dde2e8',
          400: '#d1d7df',
          500: '#b5bcc7',
          600: '#8a929d',
          700: '#5f6874',
          800: '#34404b',
          900: '#0f1419',
        },
        // Dark mode background
        dark: {
          bg: '#0f1419',
          surface: '#1a2332',
          card: '#1f2937',
          border: '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px', letterSpacing: '0.4px' }],
        sm: ['14px', { lineHeight: '20px', letterSpacing: '0.25px' }],
        base: ['16px', { lineHeight: '24px', letterSpacing: '0.15px' }],
        lg: ['18px', { lineHeight: '28px', letterSpacing: '0.1px' }],
        xl: ['20px', { lineHeight: '30px', letterSpacing: '0' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.5px' }],
        '3xl': ['30px', { lineHeight: '38px', letterSpacing: '-0.5px' }],
        '4xl': ['36px', { lineHeight: '44px', letterSpacing: '-0.5px' }],
        '5xl': ['48px', { lineHeight: '56px', letterSpacing: '-1px' }],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      borderRadius: {
        none: '0',
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        full: '9999px',
      },
      spacing: {
        0: '0',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
        24: '96px',
        28: '112px',
        32: '128px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        glass: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
        'glass-dark': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        xs: 'blur(2px)',
        sm: 'blur(4px)',
        md: 'blur(8px)',
        lg: 'blur(12px)',
        xl: 'blur(16px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      transitionDuration: {
        fast: '150ms',
        base: '300ms',
        slow: '500ms',
      },
    },
  },
  plugins: [],
}
