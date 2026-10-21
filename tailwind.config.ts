import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        duman: {
          pearl: "#f7f3ea",
          sand: "#e6dac6",
          gold: "#bc8d43",
          "gold-soft": "#d9bf8e",
          forest: "#133629",
          pine: "#0d231c",
          mist: "#f2ede3"
        }
      },
      fontFamily: {
        sans: ["Manrope", ...defaultTheme.fontFamily.sans],
        display: ["Cormorant Garamond", ...defaultTheme.fontFamily.serif]
      },
      boxShadow: {
        glow: "0 20px 60px rgba(19, 54, 41, 0.12)",
        gold: "0 14px 40px rgba(188, 141, 67, 0.25)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 700ms ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
