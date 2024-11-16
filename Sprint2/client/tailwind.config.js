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
        mediumGreen: '#234D3A',
        purplish: '#2E3048',
        bodyBg: '#242633',
        darkerBlue: '#1E1F26',
        darkBlue: '#1F223D',
        mediumBlue: '#292C4B',
        lightGreen: '#283641',
        electricBlue: '#2B7FE5',
        lilac: '#6A6DCD',
        darkLilac: '#474bc1',
        ctaYellow: '#FFC300',
        borderBlue: '#4CAFB7',
        inputGrey: '#E8E8E8',
        searchBarBg: '#4C4CAA',
        searchBarSelected: '#304B7D',
        myPageBlue: '#292C4B',
        salmonRed: '#FF6B6B',
        borderBlue: '#4CAFB7',
        customBlue: '#1E2139',
      },
      backgroundImage: {
        'herocar': "url('./src/assets/images/hero_section.png')",
        'homepage': "url('./src/assets/images/bg_homepage.png')",
        'appBg': "url('./src/assets/images/bg_homepage.png')",
        'ctaBg': "url('./src/assets/images/call_to_action.png')",
        'dropdownArrow': "url('./src/assets/images/dropdown_arrow.png')",
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
        'nav-phone': '440px',
        'calc-size': '1024px',
        'map-buttons-size': '1200px',
        'footer-tiny': '362px'
      },
      backgroundPosition: {
        'custom': 'right 35% bottom 45%',
      },
      width: {
        'calculatorWidth': '795px',
      },
    },
  },
  plugins: [],
}

