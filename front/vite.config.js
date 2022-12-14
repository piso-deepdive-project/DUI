import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/post': 'http://localhost:3000',
      '/signin': 'http://localhost:3000',
      '/signup': 'http://localhost:3000',
    },
  },
});
