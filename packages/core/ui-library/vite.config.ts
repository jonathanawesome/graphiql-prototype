/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import pluginReact from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: 'src/index.ts',
        fileName: 'graphiql-prototype-core-ui-library',
        formats: ['cjs', 'es'],
      },
      rollupOptions: {
        external: ['@graphiql-prototype/store', 'monaco-editor', 'react', 'react-dom'],
      },
    },
    plugins: [pluginReact()],
  };
});
