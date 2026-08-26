import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#2AA8E0",
        "brand-dk": "#1B7FAD",
        verified: "#5AB552",
        action: "#F5822B",
        hold: "#F6C445",
        alert: "#D14343",
        deep: "#07202E",
        deep2: "#0E2E40",
        deep3: "#5B7383",
        paper: "#F2F4F5",
        card: "#FFFFFF",
        rule: "#D8DDE0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        panel: "6px",
      },
    },
  },
  plugins: [],
};

export default config;
