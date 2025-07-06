import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',    // ✅ yeh zaroori hai mobile access ke liye
    port: 5173          // optional: change if needed
  }
})
