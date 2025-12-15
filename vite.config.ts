import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use VITE_BASE_PATH env var, or default to '/scriptae/' for GitHub Pages, '/' for local
  base: process.env.VITE_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/scriptae/' : '/'),
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
})
