import { styled } from '@graphiql-prototype/graphiql-ui-library';

export const HistoryWrap = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 34,
  height: '100%',
});

export const HistoryContent = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  overflowX: 'hidden',
});
