import { defineConfig } from 'vite';

const PORT = 3000;

export default defineConfig({
  server: {
    proxy: {
      '/': `http://localhost:${PORT}`,
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: 'main.bundle.js',
        assetFileNames: 'tail.css',
      },
    },
  },
});
