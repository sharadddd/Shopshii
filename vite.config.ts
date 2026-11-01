import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api-proxy': {
        target: 'https://slipcartbackend.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-proxy/, ''),
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            // The backend blocks requests coming from 'http://localhost:...' origins with 403.
            // Rewriting Origin and Referer headers to match the target host solves this.
            proxyReq.setHeader('origin', 'https://slipcartbackend.onrender.com')
            proxyReq.setHeader('referer', 'https://slipcartbackend.onrender.com/')
          })
        },
      },
    },
  },
})
