/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  mode: "jit",
  theme: {
    extend: {
      background: {
        'img1': "url('../public/img/img4.jpeg')",

      }
    },
  },
  plugins: [],
};
