/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {width: {
      '23': '23%'
    },
    spacing: {
      '105': ' 4.6rem',
    }},
    
  },
  plugins: [],
}

