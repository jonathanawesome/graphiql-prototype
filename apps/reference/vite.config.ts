import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === 'serve' ? '/' : '/graphiql-v2-prototype/',
    plugins: [
      react(),
      monacoEditorPlugin({
        publicPath: 'workers',
        customDistPath: (root, buildOutDir) => {
          return path.join(root, buildOutDir, '/workers');
        },
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
