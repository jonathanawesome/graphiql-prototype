import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const DocsStyled = styled('div', {
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  overflowY: 'auto',

  variants: {
    placement: {
      PATHFINDER: {
        padding: 24,
      },
      EXPLORER: {
        paddingTop: 12,
        paddingBottom: 24,
      },
    },
  },
});
