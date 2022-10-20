import { initializeMode } from 'monaco-graphql/esm/initializeMode';

import { MonacoState } from './types';

export const monacoState: MonacoState = {
  monacoGraphQLAPI: initializeMode({
    formattingOptions: {
      prettierConfig: {
        // TODO: this could use some tweaking
        printWidth: 40,
      },
    },
  }),
  monacoEditors: {
    operations: null,
    variables: null,
    results: null,
  },
};
