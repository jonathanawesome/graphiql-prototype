/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite';
// import * as path from 'path';
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
        inline: ['monaco-editor'],
        // external: [
        //   // '@radix-ui/react-select',
        //   // '@graphiql-prototype/graphiql-ui-library',
        //   //   '@graphiql-prototype/graphiql-editor',
        // ],
      },
      setupFiles: ['./setupTests.ts', './test-setup/matchMedia'],
    },
  };
});
