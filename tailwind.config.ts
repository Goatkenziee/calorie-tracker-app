import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        secondary: '#8B5CF6',
        accent: '#F59E0B',
        dark: '#1F2937',
        light: '#F9FAFB',
      },
    },
  },
  plugins: [],
}
export default config
