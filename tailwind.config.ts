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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryBg: "#a0a0a0",
        primaryBgD: "#505050",
        buttonPrimary: "#dd6F11",
        buttonCancel: "#555555",
      },
    },
  },
  plugins: [],
};
export default config;
