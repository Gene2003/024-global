/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#1E90FF', // Dodger Blue
        secondary: '#FF6347', // Tomato
        background: '#F5F5F5', // Light Gray
        surface: '#FFFFFF', // White
        accent: '#32CD32', // Lime Green
        border: '#D3D3D3', // Light Gray
      },
    },
  },
  plugins: [],
}

