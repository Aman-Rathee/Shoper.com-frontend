/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      boxShadow: {
        insetShadow: '3px 3px 5px #305657, inset -3px -3px 7px #1a5557',
      },
      backgroundColor: {
        themeBtnColor: '#3ca1c4', // Replace with your desired color
        themeBtnColorHover: '#3dc1ef', // Replace with your desired color
      },
      colors: {
        themeDrkTxtClr: '#039bd0',
        themeTxtClr: '#0099ff',
        themeBluClr: '#3ca1c4',
        themeOrngClr: '#ff0000a3', // Replace with your desired color code
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),

  ],
}

