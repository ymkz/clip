import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  server: {
    open: false,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001',
      '/image': 'http://localhost:3001',
    },
  },
})
