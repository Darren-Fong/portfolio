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
        apple: {
          gray: {
            50: '#f5f5f7',
            100: '#e8e8ed',
            200: '#d2d2d7',
            300: '#b0b0b8',
            400: '#86868b',
            500: '#6e6e73',
            600: '#515154',
            700: '#424245',
            800: '#1d1d1f',
            900: '#000000',
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      letterSpacing: {
        'apple': '0.011em',
      },
      fontFamily: {
        'apple': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Segoe UI', 'Roboto', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
