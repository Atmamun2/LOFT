import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Important for Python Anywhere static file serving
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})