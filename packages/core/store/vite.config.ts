import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: 'src/index.ts',
        fileName: 'graphiql-prototype-store',
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
        output: {
          // dir: './dist',
          chunkFileNames: '[name].[format].js',
          // manualChunks: {
          //   jsonWorker: [`monaco-editor/esm/vs/language/json/json.worker`],
          //   editorWorker: [`monaco-editor/esm/vs/editor/editor.worker`],
          //   graphqlWorker: [`monaco-graphql/dist/graphql.worker`],
          // },
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            graphql: 'GraphQL',
          },
        },
      },
    },
  };
});
