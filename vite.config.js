import path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      // Bugfix for wrong default export of delaunator in trianglify.js
      'trianglify/colorbrewer': path.resolve(
        // eslint-disable-next-line no-undef
        __dirname,
        'node_modules/trianglify/src/utils/colorbrewer.js'
      ),
      trianglify: path.resolve(
        // eslint-disable-next-line no-undef
        __dirname,
        'node_modules/trianglify/dist/trianglify.bundle.js'
      ),
    },
  },
});
