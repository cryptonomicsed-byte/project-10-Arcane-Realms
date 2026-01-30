import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgDark: "#0f172a",
        bgPanel: "#1e293b",
        primary: "#8b5cf6",
        primaryDark: "#6d28d9",
        accent: "#f59e0b",
        textMain: "#f1f5f9",
        textMuted: "#94a3b8",
        border: "#334155",
      },
      fontFamily: {
        heading: ["Georgia", "serif"],
        body: ["system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
