/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import pluginReact from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: 'src/index.ts',
        fileName: 'graphiql-prototype-core-graphiql',
        formats: ['cjs', 'es'],
      },
      rollupOptions: {
        external: [
          '@graphiql-prototype/editor',
          '@graphiql-prototype/store',
          '@graphiql-prototype/ui-library',
          'react',
        ],
        output: {
          chunkFileNames: '[name].[format].js',
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            react: 'React',
          },
        },
      },
    },
    plugins: [pluginReact()],
  };
});
