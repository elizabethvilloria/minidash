import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log('Loading vite config...')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true // This will make Vite fail if it can't use port 3000
  }
})
