/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#FF9933',
          50: '#FFF3E6',
          100: '#FFE2BF',
          200: '#FFC580',
          400: '#FF9933',
          600: '#E67E00',
          800: '#B35F00',
        },
        navy: {
          DEFAULT: '#0B1F3A',
          50: '#E9EDF3',
          100: '#C7D2E2',
          400: '#1E3A5F',
          600: '#0B1F3A',
          800: '#061328',
        },
        leaf: {
          DEFAULT: '#138808',
          50: '#E6F4E4',
          100: '#C2E6BD',
          400: '#1FA513',
          600: '#138808',
          800: '#0B5705',
        },
        cream: '#FFF8F0',
        ink: {
          DEFAULT: '#3A352F',
          light: '#5C5650',
          faint: '#8C857B',
        },
      },
      fontFamily: {
        display: ['"Baloo 2"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'ledger-lines':
          'repeating-linear-gradient(to bottom, transparent, transparent 35px, rgba(11,31,58,0.06) 36px)',
      },
    },
  },
  plugins: [],
}
