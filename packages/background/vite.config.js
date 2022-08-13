import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: '../extension/background',
    sourcemap: true,
    lib: {
      entry: './src/main.js',
      formats: ['cjs'],
      filename: 'background.js',
    },
  },
});
