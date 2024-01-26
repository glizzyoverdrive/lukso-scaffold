/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "luksoLight",
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#ffffff",
        
"secondary": "#ffffff",
        
"accent": "#ffffff",
        
"neutral": "#ffffff",
        
"base-100": "#ffffff",
        
"info": "#ffffff",
        
"success": "#db2777",
        
"warning": "#ffffff",
        
"error": "#ffffff",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
  //...
}  
;
