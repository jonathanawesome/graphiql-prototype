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
        output: {
          chunkFileNames: '[name].[format].js',
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            'monaco-editor': 'MonacoEditor',
            react: 'React',
            graphql: 'GraphQL',
          },
        },
      },
    },
    plugins: [pluginReact()],
  };
});
