import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const GraphiQLStyled = styled('div', {
  backgroundColor: '$scale100',
  height: '100%',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '60px 1fr',
});

export const Wrap = styled('div', {
  paddingTop: 16,
  paddingRight: 16,
  paddingBottom: 16,
  paddingLeft: 0,
});

export const PanePluginContainer = styled('div', {
  height: '100%',
  width: '100%',
  position: 'relative',
});
