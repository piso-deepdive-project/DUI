import { defineConfig } from 'vite';

const PORT = 3000;

export default defineConfig({
  server: {
    proxy: {
      '/post': `http://localhost:${PORT}`,
      '/signin': `http://localhost:${PORT}`,
      '/signup': `http://localhost:${PORT}`,
      '/edit': `http://localhost:${PORT}`,
      '/validUser': `http://localhost:${PORT}`,
      '/signout': `http://localhost:${PORT}`,
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'main.bundle.js',
        assetFileNames: 'tail.css',
      },
    },
  },
});
