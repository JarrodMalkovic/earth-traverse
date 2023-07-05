/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backdropFilter: ["hover", "focus"], // Add this line
      backgroundImage: {
        "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
      },
      boxShadow: {
        inner: "inset 0 0 10px 2px rgba(0, 0, 0, 0.05)", // Adjust as needed
      },
      extend: {
        backgroundColor: ["active"],
        translate: ["active"],
      },
    },
  },
  plugins: [],
};
