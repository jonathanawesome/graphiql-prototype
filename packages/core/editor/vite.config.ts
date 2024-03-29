/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import pluginReact from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: 'src/index.ts',
        fileName: 'graphiql-prototype-core-editor',
        formats: ['cjs', 'es'],
      },
      rollupOptions: {
        external: [
          '@graphiql-prototype/store',
          '@graphiql-prototype/ui-library',
          '@graphiql-prototype/graphiql-plugin-schema-documentation',
          '@graphiql-prototype/utils',
          '@radix-ui/react-radio-group',
          'monaco-editor',
          'graphql',
          'react',
        ],
      },
    },
    plugins: [pluginReact()],
  };
});
