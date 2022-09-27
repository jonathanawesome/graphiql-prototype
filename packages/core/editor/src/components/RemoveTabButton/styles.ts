import { styled } from '@graphiql-prototype/ui-library';

export const RemoveTabButtonStyled = styled('button', {
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,

  svg: {
    width: 18,
    height: 18,
    path: {
      fill: '$text3',
    },
  },

  '&:hover': {
    backgroundColor: 'red',
    svg: {
      width: 12,
      height: 12,
      path: {
        fill: '$text4',
      },
    },
  },
});
