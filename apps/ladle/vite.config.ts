import { defineConfig } from 'vite';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      // dev specific config
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
  } else {
    // command === 'build'
    return {
      // build specific config
      base: '/graphiql-v2-prototype/',
      plugins: [
        monacoEditorPlugin({
          languageWorkers: ['json', 'editorWorkerService'],
          customWorkers: [
            {
              label: 'graphql',
              entry: 'monaco-graphql/dist/graphql.worker',
            },
          ],
          publicPath: 'graphiql-v2-prototype/monacoeditorwork',
        }),
      ],
    };
  }
});
