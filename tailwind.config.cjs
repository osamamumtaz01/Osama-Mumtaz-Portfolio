/** @type {import('tailwindcss').Config} */

// Colours resolve through the CSS custom properties defined in src/index.css,
// so switching [data-theme] on <html> re-themes the whole site without any
// dark:/light: variants in the markup.
//
// `ink` is the themeable foreground: white on dark, near-black on light. Use it
// for text, surfaces and borders (text-ink, bg-ink/[0.04], border-ink/10).
// `white` stays literally white — reserve it for content sitting on a coloured
// surface, such as button labels on the brand gradient, which must not invert.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ink: token("ink"),
        primary: token("primary"),
        secondary: token("secondary"),
        tertiary: token("tertiary"),
        accent: token("accent"),
        brand: token("brand"),
        "brand-light": token("brand-light"),
        "black-100": token("black-100"),
        "black-200": token("black-200"),
        "white-100": token("white-100"),
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
