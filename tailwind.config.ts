import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      colors: {
        // ── Ported from daoships-app (indigo primary / cyan accent) ──
        primary: {
          50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc",
          400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca",
          800: "#3730a3", 900: "#312e81", 950: "#1e1b4b",
        },
        accent: {
          50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9",
          400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490",
          800: "#155e75", 900: "#164e63", 950: "#083344",
        },
        // ── Quai ecosystem accent (hybrid touch) ──
        quai: {
          DEFAULT: "#e20101",
          hot: "#ff5240",
          deep: "#7a0808",
        },
        // Literal hex (dark-only site) so Tailwind can generate /opacity variants.
        // CSS vars in globals.css remain for direct-reference uses (gradients, shadows).
        dao: {
          "dark-1": "#0a0a12",
          "dark-2": "#0f0f1a",
          "dark-3": "#161625",
          "dark-4": "#1e1e30",
          surface: "#252540",
          border: "#2e2e4a",
          text: "#f3f4f6",
          "text-secondary": "#d1d5db",
          "text-muted": "#9ca3af",
          "text-hint": "#6b7280",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-dao": "linear-gradient(135deg, var(--dao-bg-1) 0%, var(--dao-bg-2) 25%, var(--dao-bg-3) 50%, var(--dao-bg-2) 75%, var(--dao-bg-1) 100%)",
        "gradient-dao-radial": "radial-gradient(ellipse at center, var(--dao-bg-3) 0%, var(--dao-bg-1) 100%)",
      },
      boxShadow: {
        "indigo-glow": "0 0 20px rgba(99,102,241,var(--dao-glow-strength)), 0 0 40px rgba(99,102,241,calc(var(--dao-glow-strength)*0.33))",
        "indigo-glow-lg": "0 0 40px rgba(99,102,241,calc(var(--dao-glow-strength)*1.33)), 0 0 80px rgba(99,102,241,calc(var(--dao-glow-strength)*0.67))",
        "cyan-glow": "0 0 20px rgba(6,182,212,var(--dao-glow-strength)), 0 0 40px rgba(6,182,212,calc(var(--dao-glow-strength)*0.33))",
        "dao-card": "0 8px 16px rgba(0,0,0,var(--dao-shadow-strength)), 0 0 0 1px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
        "dao-button": "0 4px 8px rgba(0,0,0,var(--dao-shadow-strength)), 0 0 0 1px rgba(99,102,241,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fade-in 0.5s ease-out both",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "spin-slow": "spin-slow 60s linear infinite",
        "spin-slower": "spin-slow 120s linear infinite reverse",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5", filter: "brightness(1)" },
          "50%": { opacity: "1", filter: "brightness(1.25)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
