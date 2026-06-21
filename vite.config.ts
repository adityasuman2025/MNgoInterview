import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Inline assets smaller than 4 KB to save round trips
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Split vendor code from app code for better long-term caching
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
})
