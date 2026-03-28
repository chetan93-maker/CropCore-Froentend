import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        // FIX: Convert object to function
        manualChunks(id) {
          // Put all node_modules into chunks
          if (id.includes('node_modules')) {
            // React and React DOM
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            // UI libraries
            if (id.includes('lucide-react') || id.includes('react-icons') || id.includes('framer-motion')) {
              return 'ui-vendor'
            }
            // Charts
            if (id.includes('recharts')) {
              return 'charts-vendor'
            }
            // Utils
            if (id.includes('axios') || id.includes('react-hot-toast') || id.includes('jspdf') || id.includes('xlsx')) {
              return 'utils-vendor'
            }
            // Everything else
            return 'vendor'
          }
          // Don't split app code
          return null
        }
      }
    }
  }
})