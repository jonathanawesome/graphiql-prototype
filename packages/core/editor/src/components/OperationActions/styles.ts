import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledOperationActions = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[4],
  width: theme.space[10],
  minWidth: theme.space[10],
});

export const PlayButton = styled('button', {
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  margin: 0,
  padding: 0,
  height: theme.space[10],
  width: theme.space[10],
  display: 'flex',
  opacity: 0.8,

  '& svg': {
    height: theme.space[10],
    width: theme.space[10],
    path: {
      '&:nth-of-type(1)': {
        fill: theme.colors.pink_default,
      },
      '&:nth-of-type(2)': {
        fill: `white`,
      },
    },
  },

  '&:hover': {
    opacity: 1,
  },
});

export const PrettierButton = styled('button', {
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  margin: 0,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: theme.space[10],
  minWidth: theme.space[10],

  '& svg': {
    height: theme.space[6],
    width: theme.space[6],

    path: {
      fill: theme.colors.text4,
    },
  },

  '&:hover': {
    '& svg': {
      path: {
        fill: theme.colors.text1,
      },
    },
  },
});
