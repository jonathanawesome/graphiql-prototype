import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const GraphiQLWrap = styled('div', {
  backgroundColor: '$appBackground',
  height: '100%',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '60px 1fr',
});

export const ContentWrap = styled('div', {
  paddingTop: 16,
  paddingRight: 16,
  paddingBottom: 16,
  paddingLeft: 0,
});
