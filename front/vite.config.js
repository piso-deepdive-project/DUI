import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/post': 'http://localhost:6000',
      '/signin': 'http://localhost:6000',
      '/signup': 'http://localhost:6000',
    },
  },
});
