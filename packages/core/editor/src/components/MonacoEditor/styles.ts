import { styled } from '@graphiql-prototype/ui-library';

export const MonacoEditorStyled = styled('div', {
  height: '100%',
  width: '100%',
  // display: 'flex',
  // flex: '1 1 auto',
  // flexDirection: 'column',
});

export const MonacoWrap = styled('div', {
  height: '100%',
  width: '100%',
  '.monaco-editor': {
    // overflow: 'visible !important',
  },
});
