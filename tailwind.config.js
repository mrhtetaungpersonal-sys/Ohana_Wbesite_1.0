/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ohana: {
          'deep-blue': '#042959',
          'mid-blue': '#1B93DB',
          'soft-blue': '#388DC2',
          'light-blue': '#72B2DA',
          'pale-blue': '#D9D9D9',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
