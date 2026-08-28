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
        void: "#0a0a0c",
        charcoal: "#141413",
        stone: "#1a1a1e",
        bone: "#f5f2eb",
        "bone-dim": "#b8b4a8",
        amber: "#c9a96e",
        "amber-glow": "rgba(201, 169, 110, 0.15)",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      spacing: {
        "section-desktop": "160px",
        "section-tablet": "120px",
        "section-mobile": "80px",
        "artwork-breath": "80px",
      },
      maxWidth: {
        "content": "1440px",
      },
    },
  },
  plugins: [],
}

export default config
