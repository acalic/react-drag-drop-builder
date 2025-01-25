import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@common': path.resolve(__dirname, './src/common'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  css: {
    preprocessorOptions: {
        scss: {
            api: 'modern-compiler',
            silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import']
        }
    }
  },
})
