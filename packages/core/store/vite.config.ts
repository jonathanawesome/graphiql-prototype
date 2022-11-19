import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: 'src/index.ts',
        fileName: 'graphiql-prototype-core-store',
        formats: ['cjs', 'es'],
      },
      rollupOptions: {
        external: [
          'monaco-graphql/esm/initializeMode',
          'monaco-editor',
          'graphql',
          'react',
          'react-dom',
        ],
      },
    },
  };
});
