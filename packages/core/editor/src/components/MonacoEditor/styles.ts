import { styled } from '@graphiql-prototype/ui-library';

export const MonacoEditorStyled = styled('div', {
  height: '100%',
  width: '100%',
});

export const MonacoWrap = styled('div', {
  height: '100%',
  width: '100%',
  '.monaco-editor': {
    '.inactiveDefinition': {
      opacity: 0.5,
    },
  },
});
