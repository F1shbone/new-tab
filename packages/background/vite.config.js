import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: '../extension/background',
    lib: {
      entry: './src/main.js',
      formats: ['cjs'],
      filename: 'background.js',
    },
  },

  // build: {
  //   rollupOptions: {
  //     input: {
  //       'background/index': path.resolve(__dirname, 'src/background/main.js'),
  //     },
  //     output: {
  //       //
  //     },
  //   },
  // },
});
