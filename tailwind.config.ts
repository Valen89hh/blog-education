import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '5rem',
        },
      },
      screens: {
        xs: "480px",
        xxs: "350px",
      },
      colors: {
        background: {
          modal: "var(--background-modal)"
        },
        foreground: "var(--foreground)",
        onyx: {
          dark: "var(--onyx-dark)"
        },
        slate: {
          gray: "var(--slate-gray)",
          c: "var(--slate-c)",
          e: "var(--slate-e)"
        },
        ash: {
          gray: "var(--ash-gray)"
        },
        silver: {
          cloud: "var(--silver-cloud)"
        }
      },
      fontFamily: {
        sansita: ["var(--font-sansita)", "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
