import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log('Loading vite config...')

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    open: true
  }
}) 