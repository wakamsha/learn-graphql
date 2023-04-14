import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  // root: resolve(__dirname, './'),
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     '@learn-graphql/api': resolve(__dirname, '../../packages/api'),
  //     '@learn-graphql/core': resolve(__dirname, '../../../packages/core'),
  //   },
  // },
});
