import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative paths, so the built site works from any folder — including
  // GitHub Pages, which serves it from /english-for-kids/ (npm run deploy).
  base: './',
  plugins: [react(), tailwindcss()],
})
