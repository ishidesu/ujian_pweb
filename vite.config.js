import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,            // Port yang digunakan saat development
    open: true,            // Membuka browser secara otomatis saat menjalankan server
    historyApiFallback: true // Menambahkan fallback routing untuk React Router
  }
})
