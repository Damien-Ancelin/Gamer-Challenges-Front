import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: 'node',
    globals: true, // pour utiliser les fonctions expect, describe, etc. sans les importer
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
