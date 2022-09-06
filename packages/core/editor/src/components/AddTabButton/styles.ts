import { styled } from '@graphiql-prototype/ui-library';

export const AddTabButtonStyled = styled('button', {
  userSelect: 'none',
  width: 32,
  height: 32,
  marginLeft: 4,
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 2,

  svg: {
    width: 11,
    height: 11,
    path: {
      transition: 'fill .15s ease',
      fill: '$text4',
    },
  },

  '&:hover': {
    svg: {
      path: {
        fill: '$text3',
      },
    },
  },
});
