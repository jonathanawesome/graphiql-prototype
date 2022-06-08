import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const ResultsViewer = styled('div', {
  display: 'flex',
  height: '100%',
  width: '100%',
  paddingTop: 24,
  paddingRight: 12,
  paddingBottom: 12,
  paddingLeft: 24,
});

export const EditorGroupInner = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  padding: 8,
  backgroundColor: '#EAEDF1',
  borderRadius: 20,
});

export const EditorGroupWrap = styled('div', {
  height: '100%',
  width: '100%',
  padding: 16,
  overflow: 'hidden',
});
