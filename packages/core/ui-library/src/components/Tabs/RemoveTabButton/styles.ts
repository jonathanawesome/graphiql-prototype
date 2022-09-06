import { styled, theme } from '../../../theme';

export const StyledRemoveTabButton = styled('button', {
  all: 'reset',
  position: 'absolute',
  top: theme.space[2],
  right: theme.space[2],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: theme.space[6],
  height: theme.space[6],

  svg: {
    width: theme.space[3],
    height: theme.space[3],
    path: {
      fill: theme.colors.text3,
    },
  },

  '&:hover': {
    backgroundColor: theme.colors.surface3,

    svg: {
      width: theme.space[3],
      height: theme.space[3],
      path: {
        fill: theme.colors.text1,
      },
    },
  },
});
