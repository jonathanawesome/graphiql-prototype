import { styled } from '@graphiql-prototype/ui-library';

export const EditorInner = styled('div', {
  display: 'grid',
  gridTemplateRows: '50px 1fr',
  height: '100%',
  width: '100%',
  padding: 8,
  backgroundColor: '$gray010',
  borderRadius: 20,
});

export const EditorWrap = styled('section', {
  height: '100%',
  width: '100%',
  overflow: 'hidden',
});
