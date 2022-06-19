import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const MonacoEditorStyled = styled('div', {
  height: '100%',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
});

export const MonacoWrap = styled('div', {
  height: '100%',
  width: '100%',

  variants: {
    editorType: {
      operation: {
        // paddingRight: 48,
      },
      variables: {},
      results: {},
      headers: {},
    },
  },
});
