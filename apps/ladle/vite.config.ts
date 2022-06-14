import { defineConfig } from 'vite';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

export default defineConfig(({ command, mode }) => {
  return {
    base: command === 'serve' ? '/' : '/graphiql-v2-prototype/',
    server: {
      open: false,
    },
    plugins: [
      monacoEditorPlugin({
        languageWorkers: ['json', 'editorWorkerService'],
        customWorkers: [
          {
            label: 'graphql',
            entry: 'monaco-graphql/esm/graphql.worker',
          },
        ],
      }),
    ],
  };
});
