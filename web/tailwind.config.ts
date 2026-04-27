import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "380px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        // Elsesser & Co. palette — идентичная variables.css с сайта
        accent: {
          DEFAULT: "#00736c",
          hover: "#005d57",
        },
        cta: {
          DEFAULT: "#d97644",
          hover: "#c4693d",
        },
        navy: {
          DEFAULT: "#1a2447",
        },
        ink: {
          DEFAULT: "#333333",
          soft: "#666666",
        },
        paper: {
          DEFAULT: "#fafaf8", // тёплый off-white фон
          card: "#ffffff",
          muted: "#f5f5f5",
        },
        line: {
          DEFAULT: "#e0e0e0",
          soft: "#ececec",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-sm": ["1.75rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-md": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-lg": ["3rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        md: "0 2px 8px rgba(0, 0, 0, 0.08)",
        lg: "0 4px 16px rgba(0, 0, 0, 0.12)",
        xl: "0 8px 32px rgba(0, 0, 0, 0.16)",
        "card-hover": "0 8px 24px rgba(26, 36, 71, 0.12)",
      },
      letterSpacing: {
        nav: "0.5px",
      },
      transitionDuration: {
        fast: "150ms",
        base: "300ms",
        slow: "500ms",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s linear infinite",
        rise: "rise 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
