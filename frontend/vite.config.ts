import react from '@vitejs/plugin-react'
import {resolve} from 'node:path'
import {defineConfig} from 'vite'

export default defineConfig({
  server: {
    fs: {
      allow: ['..'] // Allow access to parent directory (for shared folder)
    },
    port: 3000
  },
  preview: {
    port: 3000
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@/': resolve(__dirname, './src') + '/',
      '@/types': resolve(__dirname, '../types'),
      '@shared': resolve(__dirname, '../shared')
    }
  }
})
console.log('Resolved path for shared folder:', resolve(__dirname, '../shared'))
