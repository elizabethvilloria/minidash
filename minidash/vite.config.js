import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log('Loading vite config...')

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,  // Changed from 3000 to 4000
    strictPort: true
  }
}) 