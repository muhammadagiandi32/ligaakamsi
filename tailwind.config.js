/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Base: asphalt / aspal jalanan
        asphalt: {
          950: '#08080A', // paling gelap — background utama
          900: '#0E0E11',
          800: '#151519',
          700: '#1D1D22',
          600: '#2A2A31',
          500: '#3A3A44',
        },
        // Accent: oranye "pylon / marka jalan" — energi jalanan
        flare: {
          DEFAULT: '#FF5F1F',
          400: '#FF7A3D',
          500: '#FF5F1F',
          600: '#E64A0B',
        },
        // Secondary accent: kuning marka jalan
        marka: '#FFC400',
        chalk: '#F4F1EC', // putih kapur, bukan putih murni
      },
      fontFamily: {
        // Display: tebal, padat, "street poster"
        display: ['Anton', 'Impact', 'Haettenschweiler', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      keyframes: {
        // Marquee dipakai sebagai fallback CSS untuk deretan logo media
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
