/// <reference types="vite/client" />

import { defineConfig } from 'vite';

import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import pluginReact from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  return {
    base: command === 'serve' ? '/' : '/graphiql-prototype/',
    server: {
      open: false,
    },
    plugins: [
      pluginReact(),
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
