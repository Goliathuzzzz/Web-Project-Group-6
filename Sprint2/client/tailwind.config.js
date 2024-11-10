/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        eGreen: '#32FF7E',
        eGreenDark: '#28CC65',
        heroTitleBg: '#1B1C22',
        darkGreen: '#076229',
        bodyBg: '#242633',
        borderBlue: '#4CAFB7',
        inputGrey: '#E8E8E8',
      },
      backgroundImage: {
        'herocar': "url('./src/assets/images/hero_section.png')"
      },
      fontFamily: {
        Orbitron: ['Orbitron', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

