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
        external: [
          '@graphiql-prototype/store',
          'monaco-editor',
          'graphql',
          'react',
          'react-dom',
        ],
        output: {
          chunkFileNames: '[name].[format].js',
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            'monaco-editor': 'MonacoEditor',
            react: 'React',
            'react-dom': 'ReactDOM',
            graphql: 'GraphQL',
          },
        },
      },
    },
    plugins: [pluginReact()],
  };
});
