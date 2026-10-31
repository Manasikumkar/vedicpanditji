import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/gsap/')) {
            return 'vendor-gsap';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-ui';
          }
          if (id.includes('src/data/guides/')) {
            return 'data-guides';
          }
          if (id.includes('src/data/locations/')) {
            return 'data-locations';
          }
          if (id.includes('src/data/allPoojaServices') || id.includes('src/data/pujaPricing')) {
            return 'data-pricing';
          }
        }
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Security-Policy': "default-src 'self' http://localhost:* ws://localhost:* http://127.0.0.1:* ws://127.0.0.1:* https: data: blob: 'unsafe-inline' 'unsafe-eval'; script-src 'self' http://localhost:* http://127.0.0.1:* https: 'unsafe-inline' 'unsafe-eval'; style-src 'self' https: 'unsafe-inline'; font-src 'self' https: data:; img-src 'self' https: data: blob:;"
    }
  }
})
