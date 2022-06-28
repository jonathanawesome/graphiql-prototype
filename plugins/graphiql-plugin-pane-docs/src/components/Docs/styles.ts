import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const DocsStyled = styled('div', {
  paddingTop: 24,
  paddingBottom: 24,
  height: '100%',
  width: 'calc(100% - 48px)',
  position: 'absolute',
  top: 0,
  left: 32,
  overflowY: 'auto',

  variants: {
    placement: {
      PATHFINDER: {},
      EXPLORER: {
        // '&::after': {
        //   content: '',
        //   position: 'absolute',
        //   top: 0,
        //   right: 0,
        //   width: 12,
        //   height: '100%',
        //   background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, $appBackground 100%)',
        // },
      },
    },
  },
});
