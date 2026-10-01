import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B1F3A",
        "on-primary": "#ffffff",
        "primary-container": "#0B1F3A",
        "on-primary-container": "#7587a7",
        secondary: "#FF6B1A",
        "on-secondary": "#0B1F3A", // Navy text on energetic orange per design system rules
        "secondary-container": "#FF6B1A",
        "on-secondary-container": "#591e00",
        tertiary: "#16A34A", // Verified Green strictly for verified badge
        "on-tertiary": "#ffffff",
        "tertiary-container": "#DCFCE7",
        "on-tertiary-container": "#15803D",
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        surface: "#f9f9ff",
        "surface-dim": "#d3daef",
        "surface-bright": "#f9f9ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f1f3ff",
        "surface-container": "#e9edff",
        "surface-container-high": "#e1e8fd",
        "surface-container-highest": "#dce2f7",
        "on-surface": "#141b2b",
        "on-surface-variant": "#44474d",
        outline: "#75777e",
        "outline-variant": "#c4c6ce",
        background: "#f9f9ff",
        "on-background": "#141b2b",
        "surface-variant": "#dce2f7",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans Tamil", "Noto Sans Malayalam", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem", // 16px
      },
    },
  },
  plugins: [],
};

export default config;
