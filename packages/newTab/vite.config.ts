import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  /* @ts-expect-error vueDevTools_no_type */
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Bugfix for wrong default export of delaunator in trianglify.js
      'trianglify/colorbrewer': fileURLToPath(
        new URL('../../node_modules/trianglify/src/utils/colorbrewer.js', import.meta.url),
      ),
      trianglify: fileURLToPath(
        new URL('../../node_modules/trianglify/dist/trianglify.bundle.js', import.meta.url),
      ),
    },
  },
  build: {
    outDir: '../extension',
  },
})
