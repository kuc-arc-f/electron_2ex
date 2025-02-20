import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    "process.env.NODE_ENV": '"production"',
  },      
  build: {
    lib: {
      entry: [
        './src/main.ts',
      ],
      formats: ['es'],
      fileName: '[name]',
    },
    rollupOptions: {
      output: {
        dir: './dist/static'
      }
    },
    emptyOutDir: false,
    copyPublicDir: false
  }
})
