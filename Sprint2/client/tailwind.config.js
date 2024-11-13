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
        darkSlate: '#1E1F26',
        customBlue: '#1E2139',
        searchBarBg: '#4C4CAA',
        searchBarSelected: '#304B7D',
      },
      backgroundImage: {
        'herocar': "url('./src/assets/images/hero_section.png')",
        'homepage': "url('./src/assets/images/bg_homepage.png')"
      },
      fontFamily: {
        Orbitron: ['Orbitron', 'sans-serif'],
        Roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'inner-lg': 'inset 0 4px 6px rgba(0, 0, 0, 0.5)',
        'inner-xl': 'inset 0 6px 10px rgba(0, 0, 0, 0.6)',
      },
      screens: {
        'custom': '1410px',
        'search-bar-bp': '975px',
        'nav-phone': '440px'
      },
    },
  },
  plugins: [],
}

