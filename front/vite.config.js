import { defineConfig } from 'vite';

const PORT = 3000;

export default defineConfig({
  server: {
    proxy: {
      '/post': `http://localhost:${PORT}`,
      '/signin': `http://localhost:${PORT}`,
      '/signup': `http://localhost:${PORT}`,
      '/edit': `http://localhost:${PORT}`,
    },
  },
});
