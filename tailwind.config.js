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
        accent: '#a2ff00',
      },
      boxShadow: {
        'neo-sm': '4px 4px 8px #0d0d0d, -4px -4px 8px #232323',
        'neo': '8px 8px 16px #0d0d0d, -8px -8px 16px #232323',
        'neo-lg': '10px 10px 20px #0d0d0d, -10px -10px 20px #232323',
        'neo-inset': 'inset 6px 6px 12px #0f0f0f, inset -6px -6px 12px #212121',
      },
      // If you want to use the animation keyframes via Tailwind classes
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px) scale(0.98)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
          'marquee-left': {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          'from': { transform: 'translateX(-50%)' },
          'to': { transform: 'translateX(0)' },
        },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 1s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'marquee-left': 'marquee-left 20s linear infinite',
        'marquee-right': 'marquee-right 20s linear infinite',

      },
    },
  },
  plugins: [],
}