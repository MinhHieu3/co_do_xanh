/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00c461",
          dark: "#009e4e",
          light: "#e6fff2",
        },
        secondary: {
          DEFAULT: "#0d1b2a",
        },
        accent: {
          DEFAULT: "#ff5722",
        },
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "sans-serif"],
        display: ["Outfit", "Inter", "sans-serif"],
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        "gradient-shift": "gradient-shift 4s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(0,196,97,0.4)" },
          "50%": { boxShadow: "0 0 30px rgba(0,196,97,0.8), 0 0 60px rgba(0,196,97,0.3)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      boxShadow: {
        "glow-green": "0 0 20px rgba(0,196,97,0.35), 0 0 60px rgba(0,196,97,0.15)",
        "glow-green-sm": "0 0 10px rgba(0,196,97,0.4), 0 4px 20px rgba(0,196,97,0.2)",
      },
    },
  },
  plugins: [],
}