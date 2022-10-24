/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    test: {
      alias: [
        {
          find: /^monaco-editor$/,
          replacement: __dirname + '/node_modules/monaco-editor/esm/vs/editor/editor.api',
        },
      ],
      globals: true,
      environment: 'jsdom',
      deps: {
        inline: ['monaco-editor'],
      },
      setupFiles: [
        './setupTests.ts',
        // monaco-related mocks
        './test-setup/canvas',
        './test-setup/getSelection',
        './test-setup/matchMedia',
        './test-setup/resizeObserver',
      ],
    },
  };
});
