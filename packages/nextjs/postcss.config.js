module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "luksoLight",
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        luksoLight: {
          "color-scheme": "light",
          primary: "var(--primary)",
          secondary: "var(--secondary)",
          accent: "var(--accent)",
          "accent-content": "var(--accent-foreground)",
          neutral: "var(--muted)",
          "neutral-content": "var(--muted-foreground)",
          "base-100": "var(--background)",
          "base-content": "var(--foreground)",
          info: "var(--input)",
          success: "var(--success)",
          warning: "var(--warning)",
          error: "var(--error)",
          "--rounded-btn": "1.9rem",
          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".text-white": { // Add this rule to make text white
            color: "#ffffff",
          },
        },
      },
      {
        luksoDark: {
          "color-scheme": "dark",
          primary: "var(--primary)",
          "primary-content": "var(--primary-foreground)",
          secondary: "var(--secondary)",
          "secondary-content": "var(--secondary-foreground)",
          accent: "var(--accent)",
          "accent-content": "var(--accent-foreground)",
          neutral: "var(--muted)",
          "neutral-focus": "var(--muted)",
          "neutral-content": "var(--muted-foreground)",
          "base-100": "var(--background)",
          "base-content": "var(--foreground)",
          info: "var(--input)",
          success: "var(--success)",
          warning: "var(--warning)",
          error: "var(--error)",
          "--rounded-btn": "1.9rem",
          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".text-white": { // Add this rule to make text white
            color: "#ffffff",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
