/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        eGreen: '#32FF7E',
        heroTitleBg: '#1B1C22',
        darkGreen: '#076229',
        bodyBg: '#242633',
        darkerBlue: '#1E1F26',
        darkBlue: '#1F223D',
        mediumBlue: '#292C4B',
        lightGreen: '#283641',
        electricBlue: '#2B7FE5',
        lilac: '#6A6DCD',
      },
      backgroundImage: {
        'herocar': "url('./src/assets/images/hero_section.png')",
        'appBg': "url('./src/assets/images/bg_homepage.png')"
      },
      fontFamily: {
        Orbitron: ['Orbitron', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

