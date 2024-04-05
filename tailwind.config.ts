import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // 'monster': '#b58760',
        'spell': '#1d9e74',
        'trap': '#bc5a84',
        'character': '#f8f9fb',

        'golden-yugioh': '#a35b00',

        'monster-normal': '#fde68a',
        'monster-effect': '#ff8b53',
        'monster-synchro': '#ccc',
        'monster-fusion': '#a086b7',
        'monster-ritual': '#538dd5',
        'monster-xyz': '#000',
        'monster-link': '#538dd5',

        // 'spell-bg': '#1d9e74',
        // 'trap-bg': '#bc5a84'
      }
    },
  },
  plugins: [],
};
export default config;
