import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  root: resolve(__dirname, './'),
  server: {
    port: 3000,
    open: true,
  },
  plugins: [react()],
});
