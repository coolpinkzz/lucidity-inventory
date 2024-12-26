import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: "#B2C45B",
        darkGreen: "#243325",
        green: "#377D22",
        background: "#161818",
        purple: "#B58BC2",
        red: "#E83323",
      },
    },
  },
  plugins: [],
} satisfies Config;
