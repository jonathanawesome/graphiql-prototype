import { defineConfig } from 'vite';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

export default defineConfig(({ command }) => {
  return {
    base: command === 'serve' ? '/' : '/graphiql-prototype/',
    server: {
      open: false,
    },
    plugins: [
      monacoEditorPlugin({
        languageWorkers: ['json', 'editorWorkerService'],
        customWorkers: [
          {
            label: 'graphql',
            entry: 'monaco-graphql/dist/graphql.worker',
          },
        ],
      }),
    ],
  };
});
