/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#709dff",
          200: "#5651e5",
        },
      },
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
      },
      height: {
        carousel: "calc(100vh - 104px)", // 104 => 26*0.25*16
      },
      backgroundImage: {
        login:
          "url('https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
      },
    },
  },
  plugins: [],
};
