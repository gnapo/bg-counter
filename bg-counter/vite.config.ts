import { fileURLToPath, URL } from 'node:url'


import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    vue(),
    {
      name: 'list-assets',
      apply: 'build',
      generateBundle(_, output) {
        const assets = Object.values(output)
            // .filter(item => item.type === 'asset')
            .map(asset => asset.fileName)

        this.emitFile({
          type: 'asset',
          fileName: 'assets.json',
          source: JSON.stringify(assets, null, 2)
        })
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
