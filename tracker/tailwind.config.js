/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customYellow: '#ffb703'
      },
      boxShadow :{
        'bottom':'0 1px 0px 0px rgba(0, 0, 0, 0.1)'

       
      }
    },
  },
  plugins: [],
}
