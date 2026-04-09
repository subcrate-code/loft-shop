import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surface2: "rgb(var(--surface-2) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accent2: "rgb(var(--accent-2) / <alpha-value>)",
        ok: "rgb(var(--ok) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)"
      },
      boxShadow: {
        glow: "0 20px 60px rgba(32, 110, 255, 0.22)",
        glass: "0 20px 70px rgba(4, 10, 22, 0.18)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.08)"
      },
      backgroundImage: {
        "radial-premium": "radial-gradient(circle at top, rgba(96, 165, 250, 0.22), transparent 40%), radial-gradient(circle at 85% 20%, rgba(244, 114, 182, 0.16), transparent 22%), radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.1), transparent 20%)"
      },
      backdropBlur: {
        xs: "2px"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.6s ease-in-out infinite",
        shimmer: "shimmer 1.8s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: 0.8, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.02)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" }
        }
      }
    }
  },
  plugins: []
};

export default config;
