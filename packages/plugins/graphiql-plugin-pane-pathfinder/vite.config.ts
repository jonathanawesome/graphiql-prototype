/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      deps: {
        inline: ['monaco-editor'],
      },
      setupFiles: ['./setupTests.ts', './test-setup/matchMedia'],
    },
  };
});
