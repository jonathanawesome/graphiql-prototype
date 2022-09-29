import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledOperationActions = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[4],
  width: theme.space[10],
  minWidth: theme.space[10],
});

export const StyledPlayButton = styled('button', {
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

export const StyledPrettierButton = styled('button', {
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

export const StyledWarningButton = styled('button', {
  cursor: 'pointer',
  margin: 0,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: theme.space[10],
  height: theme.space[10],
  minWidth: theme.space[10],
  borderRadius: theme.space[1],
  border: `1px solid ${theme.colors.orange_light}`,
  backgroundColor: theme.colors.orange_lightest,

  '& svg': {
    height: theme.space[6],
    width: theme.space[6],

    path: {
      fill: theme.colors.orange_default,
    },
  },

  '&:hover': {
    border: `1px solid ${theme.colors.orange_default}`,
  },
});
