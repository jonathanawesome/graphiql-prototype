/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import pluginReact from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: 'src/index.ts',
        fileName: 'graphiql-prototype-plugin-pane-history',
        formats: ['cjs', 'es'],
      },
      rollupOptions: {
        external: ['@graphiql-prototype/ui-library', 'react'],
      },
    },
    plugins: [pluginReact()],
  };
});
