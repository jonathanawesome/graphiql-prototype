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
        // inline: true,
        inline: [
          'monaco-editor',
          // '@radix-ui+react-select',
        ],
        // external: ['@graphiql-prototype/use-editor', '@graphiql-prototype/ui-library'],
      },
      setupFiles: ['./setupTests.ts', './test-setup/matchMedia'],
    },
  };
});
