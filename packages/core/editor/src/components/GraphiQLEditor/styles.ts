import { styled } from '@graphiql-prototype/ui-library';

export const EditorInner = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  // gridTemplateRows: '48px 1fr',
  height: '100%',
  width: '100%',
});

export const EditorWrap = styled('section', {
  height: '100%',
  width: '100%',
  overflow: 'hidden',
});
