import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const EditorInner = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  padding: 8,
  backgroundColor: '$scale300',
  borderRadius: 20,
});

export const EditorWrap = styled('div', {
  height: '100%',
  width: '100%',
  padding: 16,
  overflow: 'hidden',
});
