import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    port:5000,
    host:"0.0.0.0"
  },
  resolve:{
    alias:{
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
