import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#060708",
          900: "#0A0B0E",
          850: "#101117",
          800: "#121319",
          700: "#181A22",
          600: "#222531",
          500: "#2C3040",
          400: "#474D63",
        },
        gold: {
          50: "#FDFBF7",
          100: "#FAF4E6",
          200: "#F3E5AB",
          300: "#E5C07B",
          400: "#D4AF37",
          500: "#C59B27",
          600: "#B8860B",
          700: "#997B1A",
          800: "#6B5612",
          900: "#3D310A",
        },
        brand: {
          gold: "#D4AF37",
          "gold-light": "#F3E5AB",
          "gold-dark": "#997B1A",
          dark: "#0A0B0E",
          card: "#121319",
          card2: "#181A22",
        },
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #D4AF37 0%, #F3E5AB 50%, #B8860B 100%)",
        "gradient-gold-subtle": "linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(243, 229, 171, 0.05) 100%)",
        "gradient-dark": "linear-gradient(180deg, #0A0B0E 0%, #121319 50%, #0A0B0E 100%)",
        "gradient-card": "linear-gradient(180deg, rgba(18, 19, 25, 0.95) 0%, rgba(24, 26, 34, 0.85) 100%)",
        "gradient-glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 175, 55, 0.03) 100%)",
      },
      boxShadow: {
        "gold": "0 8px 30px rgba(212, 175, 55, 0.2)",
        "gold-glow": "0 0 35px rgba(212, 175, 55, 0.25)",
        "gold-lg": "0 15px 45px -5px rgba(212, 175, 55, 0.35)",
        "dark": "0 20px 50px rgba(0, 0, 0, 0.8)",
        "card": "0 4px 25px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
        serif: ["var(--font-cinzel)", "Cinzel", "serif"],
        display: ["var(--font-syne)", "Syne", "sans-serif"],
        mono: ["var(--font-outfit)", "Outfit", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
