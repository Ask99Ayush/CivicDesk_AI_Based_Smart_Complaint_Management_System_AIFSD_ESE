/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],

  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      colors: {
        /* =========================
           INK PALETTE
        ========================== */
        ink: {
          50: "#f5f3f0",
          100: "#e8e4dd",
          200: "#d1c9bc",
          300: "#b5a994",
          400: "#9a8a72",
          500: "#7d6e58",
          600: "#655848",
          700: "#50443a",
          800: "#433932",
          900: "#3a302c",
          950: "#1e1814",
        },

        /* =========================
           EMBER
        ========================== */
        ember: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },

        /* =========================
           JADE
        ========================== */
        jade: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },

        /* =========================
           CRIMSON
        ========================== */
        crimson: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },

        /* =========================
           SKY
        ========================== */
        sky: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },

        /* =========================
           AMBER
        ========================== */
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
      },

      backgroundImage: {
        noise:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },

      animation: {
        "pulse-slow":
          "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },

      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.06)",
      },

      borderRadius: {
        "2xl": "1.25rem",
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
  ],
};