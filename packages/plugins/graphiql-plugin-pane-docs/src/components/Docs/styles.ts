import { styled, theme } from '@graphiql-prototype/ui-library';

export const DocsStyled = styled('div', {
  height: '100%',
  width: '100%',
  padding: theme.space[6],
  // position: 'absolute',
  // top: 0,
  // left: 0,
  overflowY: 'auto',

  // variants: {
  //   placement: {
  //     PATHFINDER: {
  //       padding: 24,
  //     },
  //     EXPLORER: {
  //       '&::after': {
  //         content: '',
  //         position: 'absolute',
  //         top: 0,
  //         right: 0,
  //         width: 24,
  //         height: '100%',
  //         background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, $appBackground 100%)',
  //       },
  //     },
  //   },
  // },
});
