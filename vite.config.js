import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const resolve = (dir) => path.resolve(__dirname, dir);

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  esbuild: {
    loader: {
      '.ts': 'ts',
    },
  },
});
