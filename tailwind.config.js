/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'intro-notebook': "url('./img/intro_noteBook.jpg')"
      })
    },
  },
  plugins: [],
}
