import type { Config } from "tailwindcss";

const config: Config = {
  // CLAVE: Permite cambiar el tema manualmente mediante clases
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Aquí puedes añadir tus fuentes personalizadas si quieres
      fontFamily: {
        sans: ["var(--font-arimo)", "sans-serif"],
        serif: ["var(--font-libre-baskerville)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
