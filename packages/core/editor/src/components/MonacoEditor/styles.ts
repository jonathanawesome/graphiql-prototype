import { css } from '@graphiql-prototype/ui-library';

export const StyledMonacoEditor = css({
  height: '100%',
  width: '100%',
});

export const StyledMonacoWrap = css({
  height: '100%',
  width: '100%',
  '.monaco-editor': {
    '.inactiveDefinition': {
      opacity: 0.5,
    },
  },
});
